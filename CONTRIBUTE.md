# Contributing to UI REPO

Thank you for your interest in contributing a UI Element to this project! We appreciate your time and creativity. To maintain consistency and ease of use, we’ve provided guidelines below on how to submit your designs, including HTML, CSS, and the necessary metadata.

## Table of Contents
- [How to Contribute](#how-to-contribute)
- [Design Format](#design-format)
- [Adding a New UI Design](#adding-a-new-ui-design)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code of Conduct](#code-of-conduct)

## How to Contribute

Contributing a UI design to this project involves the following steps:
1. Fork the repository.
2. Add your UI design (HTML and CSS) to the existing format.
3. Submit a pull request.

We welcome all types of UI designs, including buttons, cards, navbars, accordions, and other interactive elements. Please follow the guidelines below to ensure your contribution can be easily integrated.

## Design Format

Please create the designs by following the [Guidlines](GUIDLINES.md)
## Adding a New UI Design

To add a UI design, follow these steps:

### 1. Fork the Repository
Fork the [ui-repo](https://github.com/arjjunk/ui-repo/) repository to your GitHub account by clicking the "Fork" button at the top of the repository page.

### 2. Clone the Repository
Once you've forked the repository, clone it to your local machine to begin working on it:
```bash
git clone https://github.com/arjjunk/ui-repo.git
```
### 3. Add Your Design

Your design should include the following components:

- HTML: The HTML structure for the design.
- CSS: The CSS that styles your design. Check the [guidlines](GUIDLINES.md) for creating a design.

- Metadata(JSON): Information about the design. Add the metadata in the ui-elements.json file in the following format.


```json
{
    "element": [
        {
            "username": "Your github username",
            "name": "Design Name",
            "htmlFile": "github_username-design_name.html",
            "cssFile": "github_username-design_name.css"
        }
    ]
}
```

### 4. Test Your Design

Before submitting your design, make sure it works as expected. Test the HTML and CSS for responsiveness and accessibility.

### 5. Commit Your Changes

Once you've added your design, commit your changes with a clear message:

```bash
git add .
git commit -m "Add custom element design"
```

### 6. Push to Your Fork

Push your changes to your forked repository:

```bash
git push origin main
```

### 7. Submit a Pull Request
After pushing your changes, go back to the original repository and submit a pull request. 

## Submitting a Pull Request

- Once your changes are pushed to your forked repository, go to the original repository and open a pull request.
- Write a detailed description of your changes and explain the UI design you have added.
- One of the maintainers will review your pull request, and you may be asked to make changes before it is merged.

## Code of Conduct

By contributing to this project, you agree to adhere to the Code of Conduct. Please be respectful and considerate in all project discussions and pull requests.

## Questions

If you have any questions or need assistance, feel free to open an issue or reach out to the project maintainers.