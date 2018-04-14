# How to Create a Material UI Custom Modal

### The Problem

Material UI provides a fantastic `Popover` component which handles all positioning. The `Popover` is 
extremely opinionated from a style and behavior standpoint. In order to create highly customized
modals, you may need to use the `Modal` component and build your own positioning.

### The Solution

Using `componentDidUpdate` to calculate the bounds of the anchor component and the modal children. 
Once complete, you can pass the `anchorRect` and `childRect` props into your custom modal.

Please remember that this repo is just a demonstration of how it's done. Your `CustomModal` will 
likely be much different. This example is provided to give you a starting point and the required 
positioning methods.

### Demo
![image](https://user-images.githubusercontent.com/1144477/38765306-f3fea08e-3f8c-11e8-8c16-8eb7ef323ef6.gif)

### Usage

1. Install dependencies:

    ```shell
    yarn
    ```

2. Run the App:

    ```shell
    yarn start
    ```

### License

The MIT License
