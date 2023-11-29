function loadMainScript() {
    const stage = new Konva.Stage({
        container: 'canvas-container',
        width: 800,
        height: 600,
        backgroundColor: '#000000'
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const shapes = [];

    const toolbar = document.getElementById('toolbar');

    // Definir las figuras y sus íconos de FontAwesome
    const shapesData = [
        { type: 'circle', icon: 'fa-circle' },
        { type: 'triangle', icon: 'fa-play' },
        { type: 'rectangle', icon: 'fa-square' },
        { type: 'heart', icon: 'fa-heart' }
    ];
    

    // Crear botones para cada figura
    shapesData.forEach(shape => {
        const button = document.createElement('button');
        button.innerHTML = `<i class="fas ${shape.icon}"></i>`;
        button.addEventListener('click', () => addShape(shape.type));
        toolbar.appendChild(button);
    });

    // Función para agregar una figura al lienzo
    function addShape(shapeType) {
        const shape = new Konva[shapeType]({
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            fill: 'blue',
            draggable: true,
        });

        shapes.push(shape);
        layer.add(shape);
        layer.draw();
    }

    // Ejemplo de eliminar figura seleccionada con la tecla Backspace
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
            const selectedShape = stage.findOne('.selected');
            if (selectedShape) {
                selectedShape.destroy();
                layer.draw();
            }
        }
    });

    // Guardar proyecto
    const serializedProject = stage.toJSON();
    localStorage.setItem('savedProject', JSON.stringify(serializedProject));

    // Cargar proyecto
    const savedProject = JSON.parse(localStorage.getItem('savedProject'));
    stage.destroyChildren();
    Konva.Node.create(savedProject, stage);
}
