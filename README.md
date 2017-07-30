# JML

JML is a super-lightweight (~2.18kB) JavaScript markup language based on the formatting conventions that HTML uses. It was intended to lessen the continuosly annoying shifts made between the HTML markup and javascripting during development. It's currently in an experimental phase.

### Key Features

  - Simple syntax that requires little effort to get used to
  - Allows direct scripting in JavaScript
  - Total harmony with HTML, JavaScript & CSS
  - Live updates that resemble that of mostache.js
  - Support for all HTML5 elements
  - Cross-browser support

### Installation

JML is written in plain JavaScript, therefore it has no dependencies. You may begin by simply including it in your HTML templates as a ordinary script:

```sh
<script type="text/javascript" src="src/jml.min.js"></script>
```

...or just include the development version:

```sh
<script type="text/javascript" src="src/jml.js"></script>
```

### Sample JML Live Update

```sh
<jml>
div(
	input({
		jmlModal: 'myModal',
		type: 'text',
		placeholder: "Type here to see JML's live update feature",
		// value: 'Alter this text',
		style: 'width: 275px; padding: 10px; border: 1px solid lightblue; border-radius: 2px;'
	}),
	br(),
	h3({jmlBind: 'myModal', style: 'color: #286bcf; text-transform: uppercase;'})
)
</jml>
```

### License

MIT

### Developers

   - Author: Bukhari Muhammad <bukharim96@gmail.com>
   - Contributor: Abdullahi Muhammad <alimohamuda80@gmail.com>
