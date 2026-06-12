---
layout: post
title: "Codex 修复 Computer 和 Chrome 插件"
date: 2026-06-10 10:00:00 +0800
categories: 技术
tags: [Codex, 插件, Windows]
---

# 解决codex安装或更新后插件不存在、Codex 更新后、Browser Use 或 Chrome 工具启动失败时使用。

## 方法一

```
解决skill：

1. 从最新安装的 Codex Desktop 包里同步 `openai-bundled` 插件 marketplace 到用户目录，并自动更新 `.codex/config.toml`(Codex App 里已经带着这些 bundled plugins，但它们没有被正确同步、注册或加载到当前用户环境。)
2. 每次codex更新，这些插件也有可能更新，部分插件需要保持最新版才能正常使用，如果需要更新插件需要先在任务管理器里退出extension-host.exe，然后在codex插件管理页面手动卸载旧版插件
3. 修复 Browser Use / Chrome 依赖的 Windows helper binaries，只复制最新的几个可执行文件
```

## 方法二

使用脚本 sync-openai-bundled.ps1，把下面内容复制保存到.ps1,
进入powershell,运行：
```
powershell -ExecutionPolicy Bypass -File "sync-openai-bundled.ps1"
```

脚本内容如下：
```
#Requires -Version 5.1
[CmdletBinding()]
param(
  # Optional override. When omitted, the script discovers Codex Desktop resources.
  [string]$ResourcesPath,

  # Optional override. Defaults to the current user's Codex home.
  [string]$CodexHome = (Join-Path $env:USERPROFILE ".codex"),

  [string[]]$Plugins = @("sites", "browser", "chrome", "computer-use", "latex"),

  [switch]$SkipExtensionHostStop
)

$ErrorActionPreference = "Stop"

function Write-Step {
  param([Parameter(Mandatory = $true)][string]$Message)
  Write-Host ""
  Write-Host "==> $Message"
}

function Require-Path {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Label
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "$Label not found: $Path"
  }
}

function Get-FirstExistingPath {
  param([string[]]$Paths)

  foreach ($path in $Paths) {
    if ($path -and (Test-Path -LiteralPath $path)) {
      return (Resolve-Path -LiteralPath $path).Path
    }
  }

  return $null
}

function Copy-FilePlain {
  param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Destination
  )

  $parent = Split-Path -Parent $Destination
  if ($parent) {
    $null = New-Item -ItemType Directory -Force -Path $parent
  }

  $inputStream = [System.IO.File]::Open($Source, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
  try {
    $outputStream = [System.IO.File]::Open($Destination, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
    try {
      $inputStream.CopyTo($outputStream)
    } finally {
      $outputStream.Dispose()
    }
  } finally {
    $inputStream.Dispose()
  }
}

function Resolve-CodexResourcesPath {
  param([string]$ExplicitPath)

  $candidates = New-Object System.Collections.Generic.List[string]

  if ($ExplicitPath) {
    $candidates.Add($ExplicitPath)
  }

  if ($env:CODEX_RESOURCES_PATH) {
    $candidates.Add($env:CODEX_RESOURCES_PATH)
  }

  if ($PSScriptRoot) {
    $candidates.Add((Join-Path $PSScriptRoot "resources"))
    $candidates.Add((Join-Path $PSScriptRoot "app\resources"))
    $candidates.Add((Join-Path (Split-Path -Parent $PSScriptRoot) "resources"))
    $candidates.Add((Join-Path (Split-Path -Parent $PSScriptRoot) "app\resources"))
  }

  $appxPackage = Get-AppxPackage -Name "OpenAI.Codex" -ErrorAction SilentlyContinue |
    Sort-Object -Property Version -Descending |
    Select-Object -First 1

  if ($appxPackage -and $appxPackage.InstallLocation) {
    $candidates.Add((Join-Path $appxPackage.InstallLocation "app\resources"))
    $candidates.Add((Join-Path $appxPackage.InstallLocation "resources"))
  }

  $programFiles = ${env:ProgramFiles}
  if ($programFiles) {
    $windowsApps = Join-Path $programFiles "WindowsApps"
    if (Test-Path -LiteralPath $windowsApps) {
      Get-ChildItem -LiteralPath $windowsApps -Directory -Filter "OpenAI.Codex_*" -ErrorAction SilentlyContinue |
        Sort-Object -Property LastWriteTime -Descending |
        ForEach-Object {
          $candidates.Add((Join-Path $_.FullName "app\resources"))
          $candidates.Add((Join-Path $_.FullName "resources"))
        }
    }
  }

  $resolved = Get-FirstExistingPath -Paths $candidates.ToArray()
  if (-not $resolved) {
    throw "Could not find Codex Desktop resources. Pass -ResourcesPath or set CODEX_RESOURCES_PATH."
  }

  return $resolved
}

function Get-CodexCli {
  param([Parameter(Mandatory = $true)][string]$ResolvedResourcesPath)

  $codexExe = Join-Path $ResolvedResourcesPath "codex.exe"
  Require-Path $codexExe "Codex CLI"

  # Windows blocks direct execution from WindowsApps. Copy to a user-writable
  # versioned temp folder together with adjacent DLLs.
  if ($codexExe -like "*\WindowsApps\*") {
    $version = "unknown"
    try {
      $fileVersion = (Get-Item -LiteralPath $codexExe).VersionInfo.FileVersion
      if ($fileVersion) {
        $version = ($fileVersion -replace '[^\w\.-]', '_')
      }
    } catch {
      $version = ((Get-Item -LiteralPath $codexExe).LastWriteTimeUtc.ToString("yyyyMMddHHmmss"))
    }

    $fallbackDir = Join-Path $env:TEMP (Join-Path "codex-cli" $version)
    $fallbackExe = Join-Path $fallbackDir "codex.exe"

    Write-Host "WindowsApps detected: copying codex.exe to $fallbackExe"
    $null = New-Item -ItemType Directory -Force -Path $fallbackDir
    Copy-FilePlain -Source $codexExe -Destination $fallbackExe

    $srcDir = Split-Path -Parent $codexExe
    Get-ChildItem -LiteralPath $srcDir -Filter "*.dll" -ErrorAction SilentlyContinue | ForEach-Object {
      Copy-FilePlain -Source $_.FullName -Destination (Join-Path $fallbackDir $_.Name)
    }

    return $fallbackExe
  }

  return $codexExe
}

function Invoke-Codex {
  param(
    [Parameter(Mandatory = $true)][string]$CodexExe,
    [Parameter(Mandatory = $true)][string[]]$Arguments,
    [switch]$AllowFailure
  )

  & $CodexExe @Arguments 2>&1 | ForEach-Object {
    Write-Host $_
  }
  $exitCode = $LASTEXITCODE

  if (($exitCode -ne 0) -and (-not $AllowFailure)) {
    throw "codex $($Arguments -join ' ') failed with exit code $exitCode"
  }

  return [int]$exitCode
}

function Stop-CodexExtensionHosts {
  param([Parameter(Mandatory = $true)][string]$CodexHome)

  $normalizedHome = $null
  if (Test-Path -LiteralPath $CodexHome) {
    $normalizedHome = (Resolve-Path -LiteralPath $CodexHome).Path
  }

  $processes = Get-Process -Name "extension-host" -ErrorAction SilentlyContinue
  foreach ($process in $processes) {
    $processPath = $null
    try {
      $processPath = $process.Path
    } catch {
      $processPath = $null
    }

    $looksLikeCodexHost = $false
    if ($processPath) {
      $looksLikeCodexHost =
        ($normalizedHome -and $processPath.StartsWith($normalizedHome, [System.StringComparison]::OrdinalIgnoreCase)) -or
        ($processPath -match "\\OpenAI\.Codex_.*\\")
    }

    if ($looksLikeCodexHost) {
      Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
      Write-Host "Stopped extension-host.exe (PID $($process.Id))"
    } elseif ($processPath) {
      Write-Host "Skipped non-Codex extension-host.exe: $processPath"
    } else {
      Write-Warning "Skipped extension-host.exe PID $($process.Id) because its path could not be inspected."
    }
  }
}

$ResourcesPath = Resolve-CodexResourcesPath -ExplicitPath $ResourcesPath
$CodexHome = [System.IO.Path]::GetFullPath($CodexHome)

$sourceRoot = Join-Path $ResourcesPath "plugins\openai-bundled"
$marketplaceJson = Join-Path $sourceRoot ".agents\plugins\marketplace.json"
$targetRoot = Join-Path $CodexHome "plugins\marketplaces\openai-bundled"

Require-Path $ResourcesPath "Codex resources directory"
Require-Path $sourceRoot "OpenAI bundled marketplace source"
Require-Path $marketplaceJson "OpenAI bundled marketplace.json"

$codexExe = Get-CodexCli -ResolvedResourcesPath $ResourcesPath
Require-Path $codexExe "Codex CLI executable"

if (-not $SkipExtensionHostStop) {
  Write-Step "Stopping Codex extension-host.exe processes so helper binaries can be refreshed"
  Stop-CodexExtensionHosts -CodexHome $CodexHome
}

Write-Step "Copying OpenAI bundled marketplace into user Codex home"
$null = New-Item -ItemType Directory -Force -Path $targetRoot
& robocopy $sourceRoot $targetRoot /E /COPY:DAT /DCOPY:DAT /R:1 /W:1 /NFL /NDL /NP
if ($LASTEXITCODE -gt 7) {
  throw "robocopy failed with exit code $LASTEXITCODE"
}

Write-Step "Registering local marketplace"
$marketplaceList = (& $codexExe plugin marketplace list 2>&1 | Out-String)
if ($marketplaceList -notmatch [regex]::Escape($targetRoot)) {
  Invoke-Codex -CodexExe $codexExe -Arguments @("plugin", "marketplace", "add", $targetRoot) | Out-Null
} else {
  Write-Host "Marketplace already registered: $targetRoot"
}

Write-Step "Installing bundled plugins from openai-bundled marketplace"
foreach ($plugin in $Plugins) {
  $selector = "$plugin@openai-bundled"
  $exitCode = Invoke-Codex -CodexExe $codexExe -Arguments @("plugin", "add", $selector) -AllowFailure
  if ($exitCode -ne 0) {
    Write-Warning "Plugin add failed for $selector with exit code $exitCode. It may already be installed or may require manual cleanup of an older copy."
  }
}

Write-Step "Refreshing Browser/Chrome Windows helper executables"
$helperSource = Join-Path $targetRoot "plugins\chrome\extension-host\windows\x64\extension-host.exe"
if (Test-Path -LiteralPath $helperSource) {
  $helperTargets = New-Object System.Collections.Generic.List[string]
  $chromeCacheRoot = Join-Path $CodexHome "plugins\cache\openai-bundled\chrome"

  $helperTargets.Add((Join-Path $chromeCacheRoot "latest\extension-host\windows\x64\extension-host.exe"))

  if (Test-Path -LiteralPath $chromeCacheRoot) {
    Get-ChildItem -LiteralPath $chromeCacheRoot -Directory -ErrorAction SilentlyContinue |
      Where-Object { $_.Name -ne "latest" } |
      ForEach-Object {
        $helperTargets.Add((Join-Path $_.FullName "extension-host\windows\x64\extension-host.exe"))
      }
  }

  foreach ($target in ($helperTargets.ToArray() | Select-Object -Unique)) {
    $parent = Split-Path -Parent $target
    $null = New-Item -ItemType Directory -Force -Path $parent
    Copy-Item -LiteralPath $helperSource -Destination $target -Force
    Write-Host "Copied: $target"
  }
} else {
  Write-Warning "Helper source missing: $helperSource"
}

Write-Step "Verification"
Invoke-Codex -CodexExe $codexExe -Arguments @("plugin", "marketplace", "list") | Out-Null
Invoke-Codex -CodexExe $codexExe -Arguments @("plugin", "list") | Out-Null

Write-Host ""
Write-Host "Done. Restart Codex Desktop to force the plugin host to reload."


```
