# Guidlines for Creating Designs

Thank you for your interest in contributing a UI Element to this project! We appreciate your time and creativity. To maintain consistency and ease of use, we’ve provided guidelines below on how to submit your designs, including HTML, CSS, JS and the necessary metadata.

Please make the designs by follwing the guidlines.

## Table of Contents
- [What to create](#what-to-create)
- [Where to create](#where-to-create)
- [Naming Rules](#naming-rules)
- [Adding Meta Data](#adding-metadata)
- [How to Submit Design](#how-to-submit-design)

## What to Create

- To create a design for a UI Element you have to create a HTML file, and add the metadata in the ui-elements.json file.
- Write the HTML file without &lt;html&gt;,&lt;head&gt;,&lt;body&gt; tags.  
- Write the HTML codes inside a &lt;div&gt;&lt;/div&gt;  
- Wrtie CSS codes as internal CSS in the &lt;style&gt;&lt;/style&gt;, and Javascript code in the &lt;script&gt;&lt;/script&gt;  
- Avoid inline style

Check this sample code

```html

<div>
    <!-- Write HTML Code of your design here -->
</div>

<style>
    /* Write CSS code of your design here */
</style>    

<script>
    // Write Javascript code of your design here
</script>


```

## Where to Create

- The HTML file should be saved in the directory corresponding to the ui element.  
- For example,   
If you are creating a button, save the HTML file in the __buttons/__ directory.  
- You can create and submit multiple designs at a time. If you are creating multiple designs at a time you should create HTML file for each design.  

## Naming Rules

- Name each file in the following format :  

    __github_username-design_name.html__  

- If you are creating multiple designs, each design name should be different.  
- Always add your github username with the file name to avoid duplicate names.
- Avoid using whitespaces while naming use _ or - instead.


## Adding Metadata

- Add the information about the design in the ui-elements.json file in the following format :   

- Add the theme according to the color of your element.  
- For example,  
    - If the button color is white, theme should be dark.
    - If the color matches with both light and dark themes write theme as both.

```json
{
    "element": [
        {
            "username": "Your github username",
            "name": "Design Name",
            "theme": "light", // For light theme
            "file": "github_username-design_name.html",
        }
    ]
}
```

## How to Submit Design

To submit a design read [CONTRIBUTE.md](CONTRIBUTE.md)