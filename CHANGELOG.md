# Project Changelog

- [Project Changelog](#project-changelog)
  - [December 4, 2025](#december-4-2025)
  - [December 3, 2025](#december-3-2025)
  - [March 3, 2024](#march-3-2024)
  - [February 26, 2024](#february-26-2024)
  - [December 9, 2023](#december-9-2023)
  - [November 19, 2023](#november-19-2023)
  - [September 16, 2023](#september-16-2023)
  - [December 16, 2022](#december-16-2022)
  - [November 30, 2021](#november-30-2021)
  - [November 19, 2021](#november-19-2021)
  - [November 17, 2021](#november-17-2021)
  - [November 13, 2021](#november-13-2021)
  - [November 9, 2021](#november-9-2021)
  - [November 5, 2021](#november-5-2021)
  - [November 4, 2021](#november-4-2021)
  - [October 9, 2021](#october-9-2021)
  - [August 16, 2021](#august-16-2021)
  - [August 15, 2021](#august-15-2021)
  - [August 11, 2021](#august-11-2021)
  - [July 20, 2021](#july-20-2021)
  - [June 22, 2021](#june-22-2021)
  - [June 10, 2021](#june-10-2021)
  - [June 8, 2021](#june-8-2021)
    - [How to use `setup`?](#how-to-use-setup)
      - [VS Code Environment](#vs-code-environment)
  - [February 26, 2021](#february-26-2021)

## December 4, 2025

- Fixed application launch issue on Ubuntu in VMware and likely on other Ubuntu systems when using `.desktop` shortcut

## December 3, 2025

- Documentation translated into Russian
- `CHANGELOG.md` rewritten in Russian
- All logs, code comments, and UI translated into Russian; added Russian localization and disabled default Chinese language from the language switch (sorry)
- Fixed deprecated `defaultSession.loadExtension`
- Patched `build.json` for successful Windows build
- Added support for `x32` Windows

## March 3, 2024

**Critical changes**

- Unified file naming and IPC conventions
- Removed dependency on Express; install it separately if needed
- Removed unnecessary window listeners, making code cleaner

## February 26, 2024

- vite `5.0.7` → `5.1.4`

## December 9, 2023

- vite `4.4.9` → `5.0.7`
- Fixed issues caused by update

## November 19, 2023

- Fixed packaging errors
- Fixed issue with incorrectly opening packaged files

## September 16, 2023

- Removed element-plus and vue-i18n dependencies, replaced with removable implementation
- Switched to native action bar instead of auto-detected title

## December 16, 2022

- Wow~ it's been a long time since the last update~ This update contains only minor fixes and patches. A major improved version is expected after New Year, and this will become a demo version~

## November 30, 2021

- Configuration info in a separate window
- Improved hot reload behavior
- Fixed build crash due to case-sensitive filenames
- Fixed event duplication caused by unregistered auto-update events

## November 19, 2021

- Added missing dependencies
- Updated dependencies
- Added JSX support in renderer

## November 17, 2021

- Updated example for passing data to child windows

## November 13, 2021

- Fixed issue where system title appeared in new windows despite custom title enabled
- Updated dependencies
- Detached update module

## November 9, 2021

- Fixed incomplete file paths for hot update downloads

## November 5, 2021

- Fixed `boundary logic error`
- Default mode set to `borderless`

## November 4, 2021

- Removed `vuex`
- Replaced `vuex` with `pinia`
- Fixed `data loss when creating child windows`

## October 9, 2021

- Updated dependencies:
  - Vue `3.2.12` → `3.2.20`
  - Vite `2.5.8` → `2.6.5`
  - Electron `13.1.9` → `15.1.2` (Great, now you have a Chinese console!)

## August 16, 2021

- Builder config separated from package
- Updated Vue to `3.2.3` and Vite to `2.5.0`

## August 15, 2021

- Set Chrome 91 as renderer target. **Note: fixes top-level await issues but drops support for older versions**
- Added access to static folder via `process.env.__static`

## August 11, 2021

- Added `i18n` support
- Added `i18n` support for `element-plus`

## July 20, 2021

- Updated dependencies
- `preload` now uses TypeScript by default
- Added obfuscation for preload and main process
- Optimized dependency structure

## June 22, 2021

- Removed Node usage from renderer, moved to preload

> No perfect preload solution yet; improvements planned

See: https://www.electronjs.org/docs/api/context-bridge#exposing-node-global-symbols

## June 10, 2021

- Dependencies updated

## June 8, 2021

- Renderer fully restructured

### How to use `setup`?

#### VS Code Environment

- Disable `vetor` / `voter`
- Install `volor`

More: https://github.com/vuejs/rfcs/pull/227

## February 26, 2021

- Project created
