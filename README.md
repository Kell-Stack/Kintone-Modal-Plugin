# Tooltip Label plugin
> Authored by Kelly Sousa

This project aims to decrease clutter on client’s apps from unnecessary labels or text fields. 

## Table of Contents

- [Installation](#installation)
- [Overview](#usage)
- [Proposal](#proposal)
- [Timeline](#timeline)


## Installation
> ***Under Construction***

1. In your App's 'Form' settings, drag a 'Blank space' field onto your app
  - click the settings gear on the blank field to add name to elementId
  - Click 'Save Form'
1. In your Subdomain's settings on the top right, navigate to Kintone Administration -> Plugins
  - See Installing Plugin Documentation for additional details(https://get.kintone.help/hc/en-us/articles/115001519707-Installing-Viewing-Plug-ins)
  - Import Tooltip Label Plug-in
3. Navigate to 'App Settings' -> 'Customization and Integration' -> Plug-ins
  - Click on 'New'
  - Tick off Tooltip Label Plugin and click 'Add'
  - Click the gear wheel that corresponds with Tooltip Label under 'Change Settings'
  - Choose the elementId's name that you want to add a modal to and type in the message you want displayed when user hovers over icon
  - Click 'Save'
  - Update app


## Overview

### **Problem**
 
As the apps you create on Kintone become more complex, admins are adding labels to direct users of the flow of the app. This overcomplicates the look and composition and takes us away from the ease of why clients are using Kintone in the first place.


![Image 1 of problem](https://user-images.githubusercontent.com/45135493/61839338-08c95e80-ae42-11e9-8a42-e6bdb9a5430f.png)

![Image 2 of problem](https://user-images.githubusercontent.com/45135493/61839432-5a71e900-ae42-11e9-95b3-5371f566f25d.png)

### **Goals**
1. Create modal plugin using icons and event listeners, we will be offering seamless instructions while eliminating clunky instructions.
2. Decrease static clutter by 10-20%
3. Provide clarification per field

### **Requirements**
- The scope of the plugin will be limited to replacing a "blank space" field elements with an icon. 
- You will have two columns in the Config settings page. 
- The first column will list out all blank space fields from your form settings and the second column will be a multi-line text box area for users to write in a message to be displayed on the modal upon hovering. 
- For each selected blank space, you will replace it with an icon and allow users to see the corresponding message when hovering over the icon

## Proposal

![Image of proposed model](https://user-images.githubusercontent.com/45135493/61895240-0fe68000-aec7-11e9-96cc-599ea0dba484.png)


### **Wireframe Workflow**

**Phase 1**
- figure out how to put icons next to any field
  - will this include a space/label? Will it not include a space/label?
  - pseudo coding 
  - config tables - figuring out which fields I’ll be manipulating
  - layout process and what materials will be used
  - will be using Tippy.js as modal 

![Image of phase 1 - save/cancel button & table](https://user-images.githubusercontent.com/45135493/61895425-81263300-aec7-11e9-8bf4-6751ed93c99e.png)


![Image of phase 1 - tooltip label plugin config settings 8/12](https://user-images.githubusercontent.com/45135493/62907111-8dfbb100-bd26-11e9-9c34-4f9159da2809.png)


### **Processes**

**Phase 1**
1. Create your layout for config section
    - Format table (look into the example code for table in the UI component)
        - References 
            - UI-Component: Table (https://kintone.github.io/kintone-ui-component/latest/Reference/Table/)
        - create two columns -> field's elementId that you want to add the modal to & the message to be displayed on hover
        - Call a function that can add new rows that will duplicate the initalData allowing users to create a new modal
2. Create save and cancel button
    - Use the built-in button from UI component for save and cancel call to set the config then return to app's plugin page


**Phase 2**
1. `setConfig` to save user input
2. Add functionality to your save and cancel button
    - Use the built-in event listeners from UI component to listen for the click trigger
        - For cancel button:
            * should return back to the app's plugin page 
        - For save button: 
          -`setConfig()`
            * take the object that contains the config settings(information from table) and make an API call to set the config then return to app's plugin page

**Phase 3**
1. In desktop.js, add icon that will be used in the modal app          

**Pseudo**

Get Blank spaces
  1. Make a call to the API that will return app's object details
  2. Iterate through to grab the elementId object for the blank space form field
  3.


Saving data:

  1. Get data from each column
  - Construct result data structure
  2. Validate data: 
  - if valid, proceed
  - if invalid, display error message
  3. Send data to API
  - Success/error callbacks, 
    - if error display error
    - if success, navigate to old page (`using window.history.back()`) -> alert user to update app to see changes 


## Timeline
This is a rough estimate of the timeline it will take to deploy the first iteration of this plugin.

***Phase 1 Due Dates***
  - July 24th: Diagram & spec review.
  - August 2nd: UI-Component Table & Save/Cancel Buttons w/o functionality

***Phase 2 Due Dates***
  - August 9th: Add blank space elementId to dropdown on table
  - August 14th: Spec submission
  - August 16th: Functionality for getConfig and setConfig as well as Save/Cancel buttons

***Phase 3 Due Dates***
  - August xx: Create spec for desktop.js file
  - August xx: Lorem ipsum dolor
  - August xx: Lorem ipsum dolor



