# Changelog

## 1.6.7 - 14/12/2020
* Added member count to status command
* New economy system implemented (ty to Sam)
* Some minor fixes

## 1.6.6 - 10/12/2020
* Fixed bug with config-welcomer
* Gramatically corrected action.js

## 1.6.5 - 07/12/2020
* Made fetching images for action command a function
* Added "feed" action
* Added sb!goose command
* Updated API's of cat and dog

## 1.6.4 - 05/12/2020

### Changes
* Added User Blacklist and introduced the use of the switch statement
* Removed the need for a staff role to be set to conduct moderation commands
* Added switch statements in config-staff
* Changed how the word filter is configured (see docs)

## 1.6.3 - 12/11/2020

### Changes

* PackageJSON global and moved version to packageJSON to account for custom settings.json
* Replaced let with var in places where its useful
* Updated help command to use new docs link
* Added dependencies to root API router


## 1.6.2 - 11/11/2020

### Changes

* Added a separate gitignore for global data
* Updated some meta information on commands
* Fixed small typos
* Added channel ignore list for logging


## **1.6.1 - 04/11/2020**

### Changes

* Reasons are now not needed for moderation commands
* Authentication token is no longer hashed


## **1.6.0 - 17/10/2020**

### **Changes**

* API Command Created
* Authentication middleware made
* Hashing and user management on Mongo integrated
* StenBot website is now integrated with StenBot so the API now works on [sb.benwhybrow.com/api](https://sb.benwhybrow.com/api)


## 1.5.5 - 16/10/2020

### Changes

* New help embeds that utilises a global function and module.exports
* Moved admin commands to a botowner folder which is ignored by the help command
* Combined balance and bal into one using aliases \(not fully working for some reason\)


## 1.5.4 - 10/10/2020

### Changes

* Created message.js for the message event \(reduces size of app.js\)
* Fixed a nickname issue occuring on userjoin
* Fixed mcping error when there isn't an MOTD on a server
* Fixed missing markdown in config-staff
* Make txtcreate work with a category


## 1.5.3 - 05/10/2020

### Changes

* Fixed some bugs when members join
* Changed the system in which the session connects to mongo and Discord, checking the config for the mode
* Redone action command using a switch system instead of if-else statements
* Added fact command
* Exposed port in dockerfile for API
* Started trying to make an API \(NO WHERE NEAR COMPLETION\)


## **1.5.1 - 24/09/2020**

### **Changes**

* Removed config options for levelling and music \(not complete\)
* Removed config options for warncap \(not complete\)
* Added some new placeholders for the welcomer message \(check docs\)
* Updated template config with MongoDB connection info
* New eventEmbed \(global\) for events and moderation commands \(redesigned\)
* Added error event to console log \(basic stuffs\)
* Disabled emojiCreate and emojiDelete events due to issues


## **1.5.0 - 15/09/20**

### **Changes**

* Storage System Change from JSON to Mongo \(Ty to Samb8104\)
* Added some stuff to Docker/Git Ignore
* Removed account command \(temporarily until actual use is figured out\)
* Fixed ticket category issue
* channelUpdate, channelDelete & channelCreate all now ignore ticket related channels


## **1.4.2 - 29/08/2020**

### **Changes**

* Began using bot.logger instead of the default console.log
* Created dev branch for collaboration work
* New interactive report command
* Renamed functions
* Merged memory usage to bot-data
* Got rid of command usage


## **1.4.1 - 22/08/2020**

### **Changes**

* Upgrade verification system to Discord v12


## **1.4.0 - 22/08/2020**

### **Changes**

* Rate limited Gsay command
* Updated to Discord V12
* Permissions on Eco Command
* New Mute, Tempmute and Unmute commands
* Fixed cat and dog commands with new APIs \(old ones stopped working\)
* Unban command


## **1.3.1 - 14/07/2020**

### Changes

* Added return to sync command
* Fixed dumb embed command


## 1.3.0 - 10/07/2020

### Changes

* Docker Support Added
* GitHub Stuff Added
* New help command
* Unnecessary console logs have been removed
* New prefix: sb!
* Achievement image is deleted after sending it.
* Modes created to update status and other things in the future.
* Send guild owner a DM if the bot joins a blacklisted server
* Gsay no longer errors
* New embed function to simplify commands code
* Moved some commands to disabled-commands
* Removed server configs to stop GitHub from tracking them
* Removed src thingy
* Updated ReadMe
* Other small things that don't matter.


## 1.2.2 - 25/11/2019

### Changes

* New Help Command
* Some bugs fixed
* Tempmute moved to the correct category
* 2 New Functions - hasConfig & promptMessage
* Added a start.bat file


## 1.2.1 - 11/11/2019

### Changes

* Fixed typo that didn't allow handler to function
* Updated Dev Bot's Token 


## 1.2.0 - 09/11/2019

### Changes

* New Command and Event Handler
* Updated Tokens
* Love Command Added
* New Discord Presence
* New Functions
* More Efficient Utilities Function
* All Packages Updated


## 1.0.0 - 06/05/2019

### Official Release Date!

* We are officially released and public! We hope you enjoy our bot and be sure to report any issues!