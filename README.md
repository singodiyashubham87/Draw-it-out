<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=40&width=900&height=80&lines=Welcome-to-Draw-it-out"/>
  <img src="./src/assets/images/logo.png" width="200px" height="200px"/>
</div>

<h4 align="center">
</center>Draw-it-out: Online Whiteboard App</h4>


## Deployed App

https://draw-it-out.vercel.app/

## 🏆 Featured in:

<table>
  <thead>
    <tr>
      <th>Event Logo</th>
      <th>Event Name</th>
      <th>Event Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td><img src="src/assets/images/Gssoc Label.png" width="200" height="auto" loading="lazy" alt="GSSoC 24"/></td>
      <td>GirlScript Summer of Code 2024</td>
      <td>GirlScript Summer of Code is a three-month-long Open Source Program conducted every summer by GirlScript Foundation. It is an initiative to bring more beginners to Open-Source Software Development.</td>
    </tr>
      <tr>
        <td><img src="src/assets/images/Social Summer of COde.jpeg" width="200" height="auto" loading="lazy" alt="GSSoC 24"/></td>
      <td>Social Summer of Code 2024</td>
      <td>The program is run by the Social(Formally Script Foundation) aims to connect students with open-source organization and projects to encourage their contribution to the open-source community. </td>
    </tr>
  </tbody>
</table>

# Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Using Drawing Tools](#using-drawing-tools)
- [Code of Conduct](#code-of-conduct)
- [Contributing Guidelines](#contributing-guidelines)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation Instructions](#installation-instructions)
    - [For Windows](#for-windows)
    - [For macOS](#for-macos)
    - [For Linux](#for-linux)
- [Releases](#releases)
- [Learn More](#learn-more)
- [Contributions](#contributions)
- [Author](#author)
- [License](#license)
- [Thanks to all the Contributors](#thanks-to-all-the-contributors)
- [Message from PA](#message-from-pa)

# Introduction

Draw-it-out is an online whiteboard tool built using ReactJS and TailwindCSS. It allows users to draw, sketch, and take snapshots of their creations. The intuitive interface and responsive design make it easy to use across various devices.


<table align="center">
    <thead align="center">
        <tr border: 1px;>
            <td><b><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/tarikul-islam-anik/main/assets/images/Star.png" width="20" height="20"> Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/tarikul-islam-anik/main/assets/images/Lady%20Beetle.png" width="20" height="20"> Issues</b></td>
            <td><b><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/tarikul-islam-anik/main/assets/images/Check%20Mark%20Button.png" width="20" height="20"> Open PRs</b></td>
            <td><b><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/tarikul-islam-anik/main/assets/images/Cross%20Mark.png" width="20" height="20"> Closed PRs</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/singodiyashubham87/Draw-it-out?style=flat&logo=github"/></td>
             <td><img alt="Forks" src="https://img.shields.io/github/forks/singodiyashubham87/Draw-it-out?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/singodiyashubham87/Draw-it-out?style=flat&logo=github"/></td>
            <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/singodiyashubham87/Draw-it-out?style=flat&logo=github"/></td>
           <td><img alt="Closed Pull Requests" src="https://img.shields.io/github/issues-pr-closed/singodiyashubham87/Draw-it-out?style=flat&color=critical&logo=github"/></td>
        </tr>
    </tbody>
</table>


# Tech Stack

- **ReactJS**
- **TailwindCSS**


# Features

- **Drawing Tools:** Users can select between different drawing tools like pencil and brush thickness.
- **Color Picker:** Choose from a wide range of colors using the color picker tool.
- **Shapes:** Users can select from different shapes, like circles, triangles, and rectangles, to use in their drawings.
- **Brush Thickness:** Adjust the thickness of the brush stroke using a range slider.
- **Snapshot:** Capture and download snapshots of the whiteboard canvas.
- **Clear Canvas:** Clear the canvas with a single click.
- **Responsive Design:** The application is responsive and works seamlessly across different screen sizes.
- **Resizable Board:** Adjust the height of the board using Increase and Decrease buttons.

# Using Drawing Tools

- **Pencil:** The pencil is selected by default in the app. Simply, move onto the canvas and start drawing.
- **Brush Thickness:** This feature will allow you to select the thickness of the brush tool.
- **Color Picker:** This feature will help to select a color of your choice. The user gets the option to select the color depending on three color models, namely, 'RGB', 'HSL' and 'HEX'. Optionally, the user can select any color on the screen as well, with the help of a color picker.
- **Snapshot:** The snapshot option allows you to store your creativity in an image form(PNG).
- **Canvas Height**: This feature will allow you to select the height of the canvas.

# Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

# Contributing Guidelines

We believe in the power of collaboration. If you have ideas to improve College.ai, feel free to contribute! Check out our [Contribution Guidelines](CONTRIBUTING.md) to get started.

# Getting Started

### Comprehensive Guide for Installing and Setting Up Draw-it-out

#### Prerequisites
- **Node.js**: Ensure that Node.js is installed on your machine. You can download it from the [official Node.js website](https://nodejs.org/).

### Installation Instructions

#### With Docker

1. **Clone the Repository**
   - Open Command Prompt.
   - Navigate to the directory where you want to clone the repository:
     ```sh
     cd path\to\your\directory
     ```
   - Clone the repository:
     ```sh
     git clone https://github.com/singodiyashubham87/Draw-it-out.git
     ```

2. **Navigate to the project directory**
   - Navigate into the project directory:
     ```sh
     cd Draw-it-out
     ```

3. **Build docker Image (only needed during first installation)**
   - Build the Docker image:
     ```sh
     docker build -t draw-it-out:latest .        
     ```

4. **Run docker image**
   - Run the Docker image:
     ```sh
     docker run -d -p 3000:3000 draw-it-out:latest
     ```

Open [http://localhost:3000](http://localhost:3000) in your browser.


#### For Windows

1. **Install Node.js**
   - Download the Node.js installer from the [Node.js download page](https://nodejs.org/).
   - Run the installer and follow the setup instructions.
   - Confirm the installation by opening Command Prompt and typing:
     ```sh
     node -v
     npm -v
     ```

2. **Clone the Repository**
   - Open Command Prompt.
   - Navigate to the directory where you want to clone the repository:
     ```sh
     cd path\to\your\directory
     ```
   - Clone the repository:
     ```sh
     git clone https://github.com/singodiyashubham87/Draw-it-out.git
     ```
   - Navigate into the project directory:
     ```sh
     cd Draw-it-out
     ```

3. **Install Dependencies**
   - Install the required dependencies by running:
     ```sh
     npm install
     ```

4. **Start the Application**
   - Start the application in development mode:
     ```sh
     npm run dev
     ```

#### For macOS

1. **Install Node.js**
   - Download the macOS installer from the [Node.js download page](https://nodejs.org/).
   - Run the installer and follow the instructions.
   - Verify the installation by opening Terminal and typing:
     ```sh
     node -v
     npm -v
     ```

2. **Clone the Repository**
   - Open Terminal.
   - Navigate to the desired directory:
     ```sh
     cd /path/to/your/directory
     ```
   - Clone the repository:
     ```sh
     git clone https://github.com/singodiyashubham87/Draw-it-out.git
     ```
   - Navigate into the project directory:
     ```sh
     cd Draw-it-out
     ```

3. **Install Dependencies**
   - Install the project dependencies by running:
     ```sh
     npm install
     ```

4. **Start the Application**
   - Start the app in development mode:
     ```sh
     npm run dev
     ```

#### For Linux

1. **Install Node.js**
   - Open Terminal.
   - Use the following commands to install Node.js (example for Ubuntu/Debian-based systems):
     ```sh
     curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```
   - Confirm the installation by typing:
     ```sh
     node -v
     npm -v
     ```

2. **Clone the Repository**
   - Navigate to the desired directory:
     ```sh
     cd /path/to/your/directory
     ```
   - Clone the repository:
     ```sh
     git clone https://github.com/singodiyashubham87/Draw-it-out.git
     ```
   - Navigate into the project directory:
     ```sh
     cd Draw-it-out
     ```

3. **Install Dependencies**
   - Install the dependencies with:
     ```sh
     npm install
     ```

4. **Start the Application**
   - Run the app in development mode:
     ```sh
     npm run dev
     ```

# Releases

- **Release 1.0** : March 15, 2024 @16:32 [First phase of application completed.]

  - Features: Added snapshot functionality and fixed minor bugs.

- **Release 0.0** : March 14, 2024 @22:31 [Zeroth phase of application completed.]
  - Features: Drawing functionality with custom thickness of the brush and custom color.

# Learn More
To learn more about the project you must refer to [Learn](learn.md)

<!--- Acknowledgements: We would like to thank all the contributors who have helped in the development of ScanVerse. I would greatly appreciate your support and contributions -->

# Contributions

You can find the contributing guideline here -> [CONTRIBUTING GUIDELINES](CONTRIBUTING.md)

# Author

- [**_Shubham Singodiya_**](https://shubham-s-socials.vercel.app/) - Lead developer and creator of the whiteboard web application.

# License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Thanks to all the Contributors

Thanks a lot for spending your time helping this project grow. Keep rocking!

<a href="https://github.com/singodiyashubham87/Draw-it-out/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=singodiyashubham87/Draw-it-out" />
</a>

# Message from PA

Thank you for visiting Draw-it-out! 💝
</br>Feel free to explore the code, contribute, and provide feedback.
