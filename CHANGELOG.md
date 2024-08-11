# Changelog

All notable changes to this project will be documented in this file.


## [# Changelog]

## [3.2.3] - 2024-08-11
### Changed
- Updated node version to 20.15.0
- Updated NPM packages to latest versions
- Made changes to the gsay command for better formatting
### Removed
- Removed Code of Conduct as not applicable and outdated

## [3.2.2] - 2024-05-08
### Added
-  Added a TODO list (TODO.md)
### Fixed
-  Fixed the `meme` command and re-enabled it

## [3.2.1] - 2024-05-07
### Added
-  Added purge function to the logUtils and make it remove any logs older than 60 days
### Changed
-  NPM updates
### Fixed
-  Fixed the `report` command and re-enabled it
-  Fixed the `lewd` command and re-enabled it
-  Fixed the `rob` and `daily` commands and re-enabled them

## [3.2.0] - 2024-05-06
### Changed
-  NPM updates
-  Fix any deprecated code from the aforementioned NPM updates
-  Migrated code to ES6
### Removed
-  Disabled the `report` command as it is broken and will be re-written
-  Disabled the `lewd` command as the API is no longer available
### Fixed
-  Fixed commands that had outdated APIs or were broken

## [3.1.0] - 2023-05-02
### Changed
- ### FINAL UPDATE
-  NPM updates & clean-up
-  Fixed an issue in which the timestamp date was in the wrong format for recent Discord.JS updates
-  Updated privacy policy contact email
### Removed
-  Removed category option from txtcreate as it's buggy
-  Removed API (parts that use auth) - Was planned for a StenBot Dashboard, however, it's open to abuse and not used
-  Removed old handler code from messageCreate event
### Fixed
-  Fixed a problem where the wrong variable was used for blocking people with the "muted" role from reacting in a new channel
-  Fixed website scaling issues
-  Fixed issue when joining a new guild in which a config wouldn't be created
-  Fixed issue with join and leave embeds not sending into the main server
-  Fixed various commands that weren't working

## [3.0.2] - 2022-09-30
### Added
-  A privacy policy has been added
### Changed
-  NPM package updates
### Removed
-  Fixed issue where tickets were still being created, even with the config option disabled
### Fixed
-  Fixed issues where some permissions were still in SCREAMING_CASE, rather than NormalCase
-  Fixed an issue where a value in the config was accidently changed from "message" to "interaction" in v3.0.0

## [3.0.1] - 2022-09-02
### Added
-  Added the gallery feature - /image
### Changed
-  Updated docker to use latest node.js
-  Updated NPM packages
### Fixed
-  Fixed statuses so they work now
-  Fixed the website as it was still using old directory structure
-  Fixed an issue where ticket channels weren't being given the correct permissions and therefore being open to everyone
-  Fixed cooldown message not display command name properly

## [3.0.0] - 2022-08-02
### Changed
-  NPM package updates
-  Settings template has been updated with the new required variables
-  Discord v14 Update
### Fixed
-  Converted from prefixed commands to slash commands
-  ESLint fixes
-  Fixed reminders

## [2.2.5] - 2022-05-12
### Added
- - Added lewd command (18+)
### Changed
- - Updated sb!info so it shows uptime correctly
- - Update NPM packages
### Deprecated
- - Switched to new image API (old one is going to deprecate a lot of what StenBot uses)
### Removed
- - Removed un-needed functions from utils.js

## [2.2.4] - 2022-04-09
### Fixed
- - StenBot no longer crashes when joining a new server (yes, it took this long to fix the bug)

## [2.2.3] - 2022-01-27
### Added
-  Added neko command
-  Added lizard subcommand to the animal command
### Changed
-  Updates to latest NPM versions - includes security fixes
-  Fixed some small issues regarding the new embed footer update
-  Update my Discord tag in messages **Discord Nitro babyyy

## [2.2.2] - 2022-01-04
### Changed
-  Updated footers to non-deprecated version (pointless change but discord.js says so)
### Fixed
-  Fixed issue with me command when user has no activities
-  Fixed errors where bot would crash if no config is available

## [2.2.1] - 2021-10-24
### Changed
-  Changed from deprecated `request` to `node-fetch` package
-  Update NPM packages
### Removed
-  Removed need to save a temp file for the achievement command
### Fixed
-  Coding style/errors fixed
-  Fixed bot crashing with some stupid API error

## [2.2.0] - 2021-10-07
### Added
-  Trycatch statements have been added to prevent the bot from crashing on closed DMs for a reminder
### Removed
-  Reminders can now succesfully be removed
### Fixed
-  Fixed issue that caused a crash when doing clearuser command
-  Fixed a crash that occured when the userjoin role didn't exist anymore
-  Join and leave guild embeds are now fixed

## [2.1.3] - 2021-09-09
### Added
-  Reminders module - List, add and remove - One time or reoccuring
### Changed
-  Updated embed footer logo
-  Updated NPM packages
### Deprecated
-  Removed parameters for connecting to Mongo (deprecated)
### Fixed
-  Fixed command handler not picking up new commands
-  Fixed me command crashing bot

## [2.1.2] - 2021-08-21
### Added
-  Added meme command
-  Fixed a mistype and added embed in the config command
### Deprecated
-  Removed body-parser (deprecated)
### Fixed
-  Fixed issue with bot crashing when no config
-  Fixed error checking on channelCreate
-  Fixed warn command - Thanks (dode5656)[https://go.benwhybrow.com/crdg]!
-  Fixed an issue with guild.owner not working

## [2.1.1] - 2021-08-13
### Added
-  Fixed issue with adding muted role to new channels
### Changed
-  Updated to the latest packages
### Fixed
-  Error handling fixed in mongo utils

## [2.1.0] - 2021-08-10
### Added
-  Added intents for the bot client
### Changed
-  Updated to v13 - changes are listed below
-  Updated to the new embed sending method
-  Updated channel types to uppercase
### Deprecated
-  Replaced deprecated message event for messageCreate
### Fixed
-  Fixed spelling mistake in rob command

## [2.0.6] - 2021-07-11
### Added
-  Automatic deployment added (to main StenBot bot)
### Changed
-  Dependencies updates
-  Disabled voting page updates due to unfixed bug in dependency
### Fixed
-  Fixed a small bug on that some code was still present from the old storage system

## [2.0.5] - 2021-05-27
### Added
-  Cleaned up info embed and added uptime
### Changed
-  Changed status command to info
### Fixed
-  Fixed mcping issue (wouldn't work with IP:Port config)

## [2.0.4] - 2021-05-05
### Added
-  Added dependabot
-  Added Code-QL
-  Voting sites added
### Changed
-  Updated NPM version
-  Bot guild updates posted in StenBot server
### Fixed
-  Fixed leave messages not formatting messages
-  Fixed caching

## [2.0.3] - 2021-03-17

## [2.0.2] - 2021-03-03
### Changed
-  Updated FUNDING.yml so the PayPal link works properly
-  Updated punishment commands to DM the user (if possible) upon the punishment being given

## [2.0.1] - 2021-02-21
### Added
-  Added command template snippet
### Changed
-  Update Dockerfile for the latest Node version
### Fixed
-  Small fixes from v2

## [2.0.0] - 2021-02-01
### Changed
-  Updated website copyright to 2021
-  Updated mongoUtils for the per-server config update
-  Changed config-staff to config-moderation
-  Changed all areas to use the new Wiki site instead of the old Docs site
### Removed
-  Removed staff_admin config entry

## [1.7.1] - 2021-01-17
### Added
-  Added leave messages and the config options for them - sb!config-leave
### Changed
-  Update total users upon joining a new guild

## [1.7.0] - 2021-01-14
### Added
-  Added cooldowns to commands
-  Added an options object to each command export to summarise a few values
-  Added the guildOnly option to command exports
-  Added support for passing message.author as a "guild" variable if a command is ran in DMs
-  Reverted about.js to traditional Discord embed, added credit section and changed the "Why StenBot was Created" text

## [1.6.11] - 2021-01-10
### Added
-  Added fox images to animal command
### Changed
-  Updated Node in Docker for the latest security update
### Fixed
-  Fixed some permissions
-  SERVER OWNERS COULD CONTROL THE MODE COMMAND?! Fixed because I'm a dumbass
-  Fixed an issue with the help embed not recognising commands with no aliases

## [1.6.10] - 2021-01-01
### Added
-  /api/stats router added
-  Fixed aliases and added aliases for some commands
-  Some spring (well, winter) cleaning (Removed unneccesary comments, added cleaner comments, removed unused packages)
-  Added template bot-data file for anyone wanting to use the open source code
-  Added GitHub FUNDING.yml file
-  Added the feature to enable and disable commands
-  Added ship command
### Removed
-  Removed un-needed files from disabled-commands

## [1.6.9] - 2020-12-26
### Added
-  Added file logging
### Removed
-  Removed logging in gitignore
### Fixed
-  Sync commands fixed

## [1.6.8] - 2020-12-22
### Added
-  GIF command added

## [1.6.7] - 2020-12-14
### Added
-  Added member count to status command
### Fixed
-  Some minor fixes

## [1.6.6] - 2020-12-10
### Fixed
-  Fixed bug with config-welcomer

## [1.6.5] - 2020-12-07
### Added
-  Added "feed" action
-  Added sb!goose command
### Changed
-  Updated API's of cat and dog

## [1.6.4] - 2020-12-05
### Added
-  Added User Blacklist and introduced the use of the switch statement
-  Added switch statements in config-staff
### Changed
-  Changed how the word filter is configured (see docs)
### Removed
-  Removed the need for a staff role to be set to conduct moderation commands

## [1.6.3] - 2020-11-12
### Added
-  Added dependencies to root API router
### Changed
-  Updated help command to use new docs link

## [1.6.2] - 2020-11-11
### Added
-  Added a separate gitignore for global data
-  Added channel ignore list for logging
### Changed
-  Updated some meta information on commands
### Fixed
-  Fixed small typos

## [**1.6.1] - 2020**-11-04

## [**1.6.0] - 2020**-10-17

## [1.5.5] - 2020-10-16

## [1.5.4] - 2020-10-10
### Fixed
-  Fixed a nickname issue occuring on userjoin
-  Fixed mcping error when there isn't an MOTD on a server
-  Fixed missing markdown in config-staff

## [1.5.3] - 2020-10-05
### Added
-  Added fact command
### Changed
-  Changed the system in which the session connects to mongo and Discord, checking the config for the mode
### Fixed
-  Fixed some bugs when members join

## [**1.5.1] - 2020**-09-24
### Added
-  Added some new placeholders for the welcomer message \(check docs\)
-  Added error event to console log \(basic stuffs\)
### Changed
-  Updated template config with MongoDB connection info
### Removed
-  Removed config options for levelling and music \(not complete\)
-  Removed config options for warncap \(not complete\)
-  Disabled emojiCreate and emojiDelete events due to issues

## [**1.5.0] - 20**-09-15
### Added
-  Added some stuff to Docker/Git Ignore
### Changed
-  channelUpdate, channelDelete & channelCreate all now ignore ticket related channels
### Removed
-  Removed account command \(temporarily until actual use is figured out\)
### Fixed
-  Fixed ticket category issue

## [**1.4.2] - 2020**-08-29

## [**1.4.1] - 2020**-08-22

## [**1.4.0] - 2020**-08-22
### Changed
-  Updated to Discord V12
### Fixed
-  Fixed cat and dog commands with new APIs \(old ones stopped working\)

## [**1.3.1] - 2020**-07-14
### Added
-  Added return to sync command
### Fixed
-  Fixed dumb embed command

## [1.3.0] - 2020-07-10
### Added
-  Docker Support Added
-  GitHub Stuff Added
### Changed
-  Modes created to update status and other things in the future.
-  Updated ReadMe
### Removed
-  Unnecessary console logs have been removed
-  Moved some commands to disabled-commands
-  Removed server configs to stop GitHub from tracking them
-  Removed src thingy
### Fixed
-  New prefix: sb!

## [1.2.2] - 2019-11-25
### Added
-  Added a start.bat file
### Fixed
-  Some bugs fixed

## [1.2.1] - 2019-11-11
### Changed
-  Updated Dev Bot's Token
### Fixed
-  Fixed typo that didn't allow handler to function

## [1.2.0] - 2019-11-09
### Added
-  Love Command Added
### Changed
-  Updated Tokens
-  All Packages Updated

## [1.0.0] - 2019-05-06