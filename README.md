# Tooltip Label plugin
> Authored by Kelly Sousa, Kinternship 2019

This plugin aims to decrease clutter from unnecessary labels or text fields on client’s Kintone apps. 

## Table of Contents

- [Specification](#specification)
- [Proposal](#proposal)
- [Timeline](#timeline)
- [Installation](#installation)


## Specification

### **Problem**
 
As the apps you create on Kintone become more complex, admins are adding labels to direct users of the flow of the app. This overcomplicates the look and composition which takes away from the ease and purpose of using Kintone.


![Image 1 of problem](https://user-images.githubusercontent.com/45135493/61839338-08c95e80-ae42-11e9-8a42-e6bdb9a5430f.png)

![Image 2 of problem](https://user-images.githubusercontent.com/45135493/61839432-5a71e900-ae42-11e9-95b3-5371f566f25d.png)

### **Goals**
1. Create modal plugin using icons and event listeners
2. Decrease static clutter by 10-20%
3. Provide clarification per field

### **Requirements**
- The scope of the plugin will be limited to replacing a "blank space" field elements with an icon. 
- You will have two columns in the Config settings page. 
- The first column will list out all blank space fields from your form settings and the second column will be a multi-line text box area for users to write in a message to be displayed on the modal upon hovering. 
- For each selected blank space, you will replace it with an icon and allow users to see the corresponding message when hovering over the icon

    - User Perspective (config settings)
      - When a user goes into the settings page of the Tooltip plugin, they will see a table with two columns. 
      - The first column is called “Spaces”. It is a drop-down that lists out all of the space element ID’s from the app form.  
      - The second column is called “Message”. It is a text area where users can type a message.
      - For each row in the table, the user can select the space that they would like to  replace with a tooltip icon. On each row, they can also specify the message that they would like to display when a user hovers over the tooltip icon in the record details page. 
      - Access that blank space field from a dropdown on the configuration table settings for the plugin
      - Type the text you want displayed on the modal in the text area
      - Save settings and update app
      - When user hovers over icon, modal appears

    - Technical Perspective
      - User will access ‘Blank Space’ fields by element Id previously set in form settings
      - In configuration table, they will type a message that will be displayed once the hover event is triggered
      - Save button: when user clicks on save button, table values will be saved and page will be redirected to the apps settings page
      - Cancel button: when user clicks on cancel button, page will redirect to the apps settings page
      - If table input is updated, the deletion or addition of space will be reflected in the dropdown column of the table;
      - If a space is selected in one row of the dropdown column, then it will disable 
    option to choose this space in the following row. 
      -If table is incomplete, an error will appear once user attempts to click save button
        - text wasn’t inputted
        - elementId wasn’t chosen
      - If form fields are updated and the spaces used in the plugin settings page have been deleted, provide an alert message in the details page view and list view notifying users that they need to contact the app administrator to update the plugin. 



## Proposal

![Proposed wireframe of MVP 8/13](https://user-images.githubusercontent.com/45135493/62977746-7c70e280-bdd4-11e9-8555-77c5f5459da4.png)

![tooltip label plugin config table settings 8/12](https://user-images.githubusercontent.com/45135493/62907111-8dfbb100-bd26-11e9-9c34-4f9159da2809.png)



### **Wireframe Workflow**

**Phase 1**
- figure out how to put icons next to any field
  - will this include a space/label? Will it not include a space/label?
  - pseudo coding 
  - config tables -- figuring out which fields I’ll be manipulating
  - layout process and what materials will be used
  - will be using Tippy.js as modal 


### **Processes**

**Phase 1**
1. Create your layout for config section
    - Format table (look into the example code for table in the UI component)
        - References 
            - UI-Component: Table (https://kintone.github.io/kintone-ui-component/latest/Reference/Table/)
        - create two columns -> field's elementId that you want to add the modal to & the message to be displayed on hover
        - Call a function that can add new rows that will duplicate the initalData allowing users to create a new modal
2. Create save and cancel button
    - Use the built-in button from UI component for save and cancel w/o functionality 


**Phase 2**
1. `setConfig` to save user input
2. Add functionality to your save and cancel button
    - Use the built-in event listeners from UI component to listen for the click trigger to set the config then return to app's plugin page
        - For cancel button:
            * should return back to the app's plugin page 
        - For save button: 
          -`setConfig()`
            * take the object that contains the config settings(information from table) and make an API call to set the config then return to app's plugin page

**Phase 3**
1. In desktop.js, add icon that will be used in the modal app
2. Implement Tippy.js modals        

**Pseudo**

Get Blank spaces
  1. Make a call to the API that will return app's object details
  2. Iterate through to grab the elementId object for the blank space form field
  3. Send that object to the drop down in the configuration settings table

Saving data:

  1. Get data from each column
  - Construct result data structure
  2. Validate data: 
  - if valid, proceed/ populate table
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
  - August xx: Add Tippy.js for modal config
  - August xx: Lorem ipsum dolor

## Installation
> ***Under Construction*** 
_add gif demo of plugin_

1. In your App's 'Form' settings, drag a 'Blank space' field onto your app
    - click the settings gear on the blank field to add name to elementId
    - Click 'Save Form'
2. In your Subdomain's settings on the top right, navigate to Kintone Administration -> Plugins
    - See Installing Plugin Documentation for additional details(https://get.kintone.help/hc/en-us/articles/115001519707-Installing-Viewing-Plug-ins)
    - Import Tooltip Label Plug-in
3. Navigate to 'App Settings' -> 'Customization and Integration' -> Plug-ins
    - Click on 'New'
    - Tick off Tooltip Label Plugin and click 'Add'
    - Click the gear wheel that corresponds with Tooltip Label under 'Change Settings'
    - Choose the elementId's name that you want to add a tooltip to and type in the message you want displayed when user hovers over icon
    - Click 'Save'
    - Have admin update app