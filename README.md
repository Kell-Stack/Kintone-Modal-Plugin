# Modal plugin
> Authored by Kelly Sousa - July 22, 2019

This project aims to decrease clutter on client’s apps from unnecessary labels or text fields.

## Table of Contents

- [Installation](#installation)
- [Overview](#usage)
- [Proposal](#proposal)
- [Timeline](#timeline)


## Installation

## Overview

### **Problem**

#### 
As the apps you create on Kintone become more complex, admins are adding labels to direct users of the flow of the app. This overcomplicates the look and composition and takes us away from the ease of why clients are using Kintone in the first place.

![Image 1 of problem](https://user-images.githubusercontent.com/45135493/61839338-08c95e80-ae42-11e9-8a42-e6bdb9a5430f.png)

![Image 2 of problem](https://user-images.githubusercontent.com/45135493/61839432-5a71e900-ae42-11e9-95b3-5371f566f25d.png)

### **Goals**
1. Create modal plugin using icons and event listeners, we will be offering seamless instructions while eliminating clunky directions.
2. Decrease static clutter by 10-20%
3. Provide clarification per label/text fields



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


### **Processes (pseudo code with Georgina)**

**Phase 1**
1. Create your layout for config section
    - Format table -look into the example code for table in the UI component 
        - Refernces 
            - UI-Component:  Table (https://kintone.github.io/kintone-ui-component/latest/Reference/Table/)
            - Conditional Formatting config.js file
                - create at least two columns -> field that you want to add the modal to & the message (think conditional format table)
                - you will need to call a function so that you can add new rows (new conditions/new message/new modal)
                - iterate through so the default blank info that was in the row above will show up again if the user duplicates(built into the lib)
                - `.getElementById` of settings and append the render table to it 
                    * `document.getElementById(‘settings’)`
2. Create save and cancel button
    - Use the built-in event listeners from UI component to listen for the click trigger
        - For cancel button:
            * `.click()` or `.change()` should return back to the settings page `history.back()`
        - For save button: 
            * take the object that contains the config settings (information from table) and make an API call to set the config then return to the list of all plugins page (where conditional formatting and tooltip are)`
3. **KEEP IN MIND**
  - alert messages on the save button if one column is filled but not the other -> alert for incomplete data
  - make an API call to get the form fields, populate and convert into the following format:
    ~~~
    items: [
           {
               label: 'Orange',
               value: 'Orange',
               isDisabled: false
           },
           {
               label: 'Banana',
               value: 'Appetizer',
               isDisabled: true
           },
           {
               label: 'Lemon',
               value: 'Lemon',
               isDisabled: true
           },
         ],
         value: 'Banana'
       },
    ~~~

  * create `var` with this format and set it for the "items"
  * the value will be the **FIELD CODE** (will get an error if you put a value that is not a valid field code name)


## Timeline
This is a rough estimate of the timeline it will take to deploy the first iteration of this plugin.

***Phase 1 Due Dates***
  - July 24th: Diagram & spec review.
  - July 31st: Table & Save/Cancel Buttons
  - July xx: Lorem ipsum dolor

***Phase 2 Due Dates***
  - August xx: Lorem ipsum dolor
  - August xx: Lorem ipsum dolor
  - August xx: Lorem ipsum dolor

***Phase 3 Due Dates***
  - August xx: Lorem ipsum dolor
  - August xx: Lorem ipsum dolor
  - August xx: Lorem ipsum dolor



