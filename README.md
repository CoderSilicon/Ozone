![Ozone](./src/assets/logo.png)
# Ozone: 3D spin-off of "Siliconja"

If you have visited `Siliconja`, then you might immedietly understand which direction is this. `Ozone` is a high-performance, minimal scientific instrument designed for  3D spatial reconstruction and visual analytics of *compounds and molecules*. Built as an advanced molecular spin-off of the *Siliconja's* ideas and structures, *Ozone* allows researchers, developers, and students or anyone to give just name and immediately see physics-based 3D atomic structure directly in the browser.

Built by PubChem REST API, the platform fetches raw spatial coordinate data, processes molecular geometry vectors, and renders full WebGL assemblies on a sterile, pitch-black tactical interface.

### Core Principles
It is a simple and interactive website designed for exploring molecular structures in 3D. All you need to do is enter the name of the molecule; any molecule, and upon pressing enter, it verifies it using PubChem. Once fetched, the molecule is rendered in a fully interactive 3D view. Users can switch between Ball-and-Stick and Sphere visualization modes based on their preference, making it easy to examine molecular structures from different perspectives. The experience is straightforward, responsive, and focused on making molecular visualization accessible and enjoyable. The purpose is just to make chemistry intriguing and knowledgable.

### Features

* **Dual-Mode Viewport:** Live terminal controls to toggle configurations instantly between **Ball & Stick** and volumetric **Space Filling** representations.
* **Organic Dataset Guard:** Auto-intercepts organic compounds that lack pre-calculated 3D conformation models to prevent canvas layout corruption.
* That's it

### Technical Stack
* **Engine:** Three.js / WebGL Rendering Pipeline
* **Core:** SolidJS (Signals & Contextual Resources)
* **Interface:** SolidJS(JSX), TailwindCSS,
* **Data Layer:** PubChem PUG REST API

### Note
* It does not supports **inorganic or too large compunds**
* There are be mismatch of **number of bonds**
* & That's it.
---

**Developed by @codersilicon**