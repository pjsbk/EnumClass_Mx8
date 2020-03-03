## Typical usage scenario

    Color a label, based on the value that it displays.
    Highlight rows in a Template Grid, based on the status of the row object.
    Show an image for a status attribute, and color the image based on the status value.

## Features and limitations

    Classes can be added to the element itself, its parent or its Template Grid Row.
    Values can be replaced by Glyphicons, which can get a tooltip and a class, based on the valu

## Configuration

    Add the widget inside an object context.
    Select the attribute that contains the value which should determine the class.
    Per possible value, specify the class that should be added. Optionally, you can specify a custom caption. This will override the displayed value or will be used as the title attribute of the glyphicon.
    Select the element that the class should be applied to: the label itself, its parent or its templategrid row.
    When you want to replace the element by a glyphicon, specify the name of the glyphicon.

## Features and Limitations

Style by reference is not in the initial port since this property type is depracated in the new framework.
