const shapeSelect = document.getElementById("shape");
const propertySelect = document.getElementById("property");
const propertyContainer = document.getElementById("property-container");
const inputContainer = document.getElementById("input-container");
const resultContainer = document.getElementById("result-container");
const resultDiv = document.getElementById("result");

const shapeProperties = {
    square: {
        area: ["Side length"],
        perimeter: ["Side length"],
    },
    rectangle: {
        area: ["Width", "Height"],
        perimeter: ["Width", "Height"],
    },
    triangle: {
        area: ["Base", "Height"],
        perimeter: ["Side A", "Side B", "Side C"],
    },
    hexagon: {
        area: ["Side length"],
        perimeter: ["Side length"],
    },
    block: {
        volume: ["Length", "Width", "Height"],
        surfaceArea: ["Length", "Width", "Height"],
    },
    rhombus: {
        area: ["Diagonal 1", "Diagonal 2"],
        perimeter: ["Side length"],
    },
    trapezoid: {
        area: ["Base 1", "Base 2", "Height"],
        perimeter: ["Side A", "Side B", "Base 1", "Base 2"],
    },
    squareBlock: {
        volume: ["Side length"],
        surfaceArea: ["Side length"],
    },
    rectangleBlock: {
        volume: ["Width", "Height", "Depth"],
        surfaceArea: ["Width", "Height", "Depth"],
    },
    pyramid: {
        volume: ["Base area", "Height"],
    },
    cup: {
        volume: ["Radius", "Height"],
        surfaceArea: ["Radius", "Height"],
    },
    funnel: {
        volume: ["Radius", "Height"],
        surfaceArea: ["Radius", "Height"],
    },
};

// Updates the property select dropdown based on selected shape
function updateProperties() {
    const selectedShape = shapeSelect.value;
    propertySelect.innerHTML = "";
    inputContainer.innerHTML = "";
    resultDiv.innerHTML = "";

    if (selectedShape) {
        propertyContainer.classList.remove("hidden");

        const properties = shapeProperties[selectedShape];
        for (let property in properties) {
            const option = document.createElement("option");
            option.value = property;
            option.textContent = property.charAt(0).toUpperCase() + property.slice(1);
            propertySelect.appendChild(option);
        }
        updateInputs();
    } else {
        propertyContainer.classList.add("hidden");
        inputContainer.classList.add("hidden");
        resultContainer.classList.add("hidden");
    }
}

// Updates the input fields based on selected property
function updateInputs() {
    const selectedShape = shapeSelect.value;
    const selectedProperty = propertySelect.value;
    const inputs = shapeProperties[selectedShape][selectedProperty];

    inputContainer.innerHTML = "";
    resultDiv.innerHTML = "";

    if (inputs && inputs.length > 0) {
        inputContainer.classList.remove("hidden");
        resultContainer.classList.remove("hidden");

        inputs.forEach(input => {
            const label = document.createElement("label");
            label.textContent = input + ":";
            const inputField = document.createElement("input");
            inputField.type = "number";
            inputField.id = input.replace(/ /g, "").toLowerCase();
            inputField.placeholder = "Enter " + input.toLowerCase();
            inputContainer.appendChild(label);
            inputContainer.appendChild(inputField);
        });
    } else {
        inputContainer.classList.add("hidden");
        resultContainer.classList.add("hidden");
    }
}

// Calculates the result based on inputs and shows the formula
function calculate() {
    const selectedShape = shapeSelect.value;
    const selectedProperty = propertySelect.value;

    const inputs = shapeProperties[selectedShape][selectedProperty].map(input =>
        parseFloat(document.getElementById(input.replace(/ /g, "").toLowerCase()).value)
    );

    let result = 0;
    let formula = '';
    let formulaWithValues = '';

    switch (selectedShape) {
        case "square":
            if (selectedProperty === "area") {
                result = inputs[0] * inputs[0];
                formula = 'Area = side²';
                formulaWithValues = `Area = ${inputs[0]}²`;
            } else if (selectedProperty === "perimeter") {
                result = 4 * inputs[0];
                formula = 'Perimeter = 4 × side';
                formulaWithValues = `Perimeter = 4 × ${inputs[0]}`;
            }
            break;
        case "rectangle":
            if (selectedProperty === "area") {
                result = inputs[0] * inputs[1];
                formula = 'Area = width × height';
                formulaWithValues = `Area = ${inputs[0]} × ${inputs[1]}`;
            } else if (selectedProperty === "perimeter") {
                result = 2 * (inputs[0] + inputs[1]);
                formula = 'Perimeter = 2 × (width + height)';
                formulaWithValues = `Perimeter = 2 × (${inputs[0]} + ${inputs[1]})`;
            }
            break;
        case "triangle":
            if (selectedProperty === "area") {
                result = 0.5 * inputs[0] * inputs[1];
                formula = 'Area = 0.5 × base × height';
                formulaWithValues = `Area = 0.5 × ${inputs[0]} × ${inputs[1]}`;
            } else if (selectedProperty === "perimeter") {
                result = inputs[0] + inputs[1] + inputs[2];
                formula = 'Perimeter = side A + side B + side C';
                formulaWithValues = `Perimeter = ${inputs[0]} + ${inputs[1]} + ${inputs[2]}`;
            }
            break;
        case "hexagon":
            if (selectedProperty === "area") {
                result = (3 * Math.sqrt(3) * inputs[0] * inputs[0]) / 2;
                formula = 'Area = (3 × sqrt(3) / 2) × side²';
                formulaWithValues = `Area = (3 × sqrt(3) / 2) × ${inputs[0]}²`;
            } else if (selectedProperty === "perimeter") {
                result = 6 * inputs[0];
                formula = 'Perimeter = 6 × side';
                formulaWithValues = `Perimeter = 6 × ${inputs[0]}`;
            }
            break;
        case "block":
            if (selectedProperty === "volume") {
                result = inputs[0] * inputs[1] * inputs[2];
                formula = 'Volume = length × width × height';
                formulaWithValues = `Volume = ${inputs[0]} × ${inputs[1]} × ${inputs[2]}`;
            } else if (selectedProperty === "surfaceArea") {
                result = 2 * (inputs[0] * inputs[1] + inputs[1] * inputs[2] + inputs[2] * inputs[0]);
                formula = 'Surface Area = 2 × (length × width + width × height + height × length)';
                formulaWithValues = `Surface Area = 2 × (${inputs[0]} × ${inputs[1]} + ${inputs[1]} × ${inputs[2]} + ${inputs[2]} × ${inputs[0]})`;
            }
            break;
        case "rhombus":
            if (selectedProperty === "area") {
                result = 0.5 * inputs[0] * inputs[1];
                formula = 'Area = 0.5 × diagonal 1 × diagonal 2';
                formulaWithValues = `Area = 0.5 × ${inputs[0]} × ${inputs[1]}`;
            } else if (selectedProperty === "perimeter") {
                result = 4 * inputs[0];
                formula = 'Perimeter = 4 × side';
                formulaWithValues = `Perimeter = 4 × ${inputs[0]}`;
            }
            break;
        case "trapezoid":
            if (selectedProperty === "area") {
                result = 0.5 * (inputs[0] + inputs[1]) * inputs[2];
                formula = 'Area = 0.5 × (base 1 + base 2) × height';
                formulaWithValues = `Area = 0.5 × (${inputs[0]} + ${inputs[1]}) × ${inputs[2]}`;
            } else if (selectedProperty === "perimeter") {
                result = inputs[0] + inputs[1] + inputs[2] + inputs[3];
                formula = 'Perimeter = base 1 + base 2 + side A + side B';
                formulaWithValues = `Perimeter = ${inputs[0]} + ${inputs[1]} + ${inputs[2]} + ${inputs[3]}`;
            }
            break;
        case "squareBlock":
            if (selectedProperty === "volume") {
                result = Math.pow(inputs[0], 3);
                formula = 'Volume = side³';
                formulaWithValues = `Volume = ${inputs[0]}³`;
            } else if (selectedProperty === "surfaceArea") {
                result = 6 * Math.pow(inputs[0], 2);
                formula = 'Surface Area = 6 × side²';
                formulaWithValues = `Surface Area = 6 × ${inputs[0]}²`;
            }
            break;
        case "rectangleBlock":
            if (selectedProperty === "volume") {
                result = inputs[0] * inputs[1] * inputs[2];
                formula = 'Volume = width × height × depth';
                formulaWithValues = `Volume = ${inputs[0]} × ${inputs[1]} × ${inputs[2]}`;
            } else if (selectedProperty === "surfaceArea") {
                result = 2 * (inputs[0] * inputs[1] + inputs[1] * inputs[2] + inputs[2] * inputs[0]);
                formula = 'Surface Area = 2 × (width × height + height × depth + depth × width)';
                formulaWithValues = `Surface Area = 2 × (${inputs[0]} × ${inputs[1]} + ${inputs[1]} × ${inputs[2]} + ${inputs[2]} × ${inputs[0]})`;
            }
            break;
        case "pyramid":
            if (selectedProperty === "volume") {
                result = (inputs[0] * inputs[1]) / 3;
                formula = 'Volume = (base area × height) / 3';
                formulaWithValues = `Volume = (${inputs[0]} × ${inputs[1]}) / 3`;
            }
            break;
        case "cup":
            if (selectedProperty === "volume") {
                result = Math.PI * Math.pow(inputs[0], 2) * inputs[1];
                formula = 'Volume = π × radius² × height';
                formulaWithValues = `Volume = π × ${inputs[0]}² × ${inputs[1]}`;
            } else if (selectedProperty === "surfaceArea") {
                result = 2 * Math.PI * inputs[0] * (inputs[0] + inputs[1]);
                formula = 'Surface Area = 2 × π × radius × (radius + height)';
                formulaWithValues = `Surface Area = 2 × π × ${inputs[0]} × (${inputs[0]} + ${inputs[1]})`;
            }
            break;
        case "funnel":
            if (selectedProperty === "volume") {
                result = (Math.PI * Math.pow(inputs[0], 2) * inputs[1]) / 3;
                formula = 'Volume = (π × radius² × height) / 3';
                formulaWithValues = `Volume = (π × ${inputs[0]}² × ${inputs[1]}) / 3`;
            } else if (selectedProperty === "surfaceArea") {
                result = Math.PI * inputs[0] * (inputs[0] + Math.sqrt(Math.pow(inputs[0], 2) + Math.pow(inputs[1], 2)));
                formula = 'Surface Area = π × radius × (radius + slant height)';
                formulaWithValues = `Surface Area = π × ${inputs[0]} × (${inputs[0]} + sqrt(${inputs[0]}² + ${inputs[1]}²))`;
            }
            break;
    }

    resultDiv.innerHTML = `
        <div>Result: ${result.toFixed(2)}</div>
        <div>Formula: ${formula}</div>
        <div>Formula with values: ${formulaWithValues}</div>
    `;
}

// Event listeners
shapeSelect.addEventListener("change", updateProperties);
propertySelect.addEventListener("change", updateInputs);
document.getElementById("calculate").addEventListener("click", calculate);

// Initialize
updateProperties();
