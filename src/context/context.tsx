import { createContext } from "react";

// Define the structure of a theme object
interface Theme {
  canvasBackground: [number, number, number]; // Tuple for RGB values
  backgroundColor: string;
  textColor: string;
  wireframe?: boolean;
}

// Define the structure of the Themes object (key-value pairs of theme names and Theme objects)
interface Themes {
  dark: Theme;
  light: Theme;
}

// Define your themes
const THEMES: Themes = {
  dark: {
    canvasBackground: [0.0018211619011764706, 0.008023192982520563, 0.019382360952473074],
    backgroundColor: 'black',
    textColor: 'white',
 	wireframe: false,
  },
  light: {
    canvasBackground: [0.0118211619011764706, 0.018023192982520563, 0.029382360952473074],
    backgroundColor: 'lightblue',
    textColor: 'black',
	wireframe: true,
  }
}

// Define the type for the context value. It's the keys of THEMES.
type ThemeName = keyof typeof THEMES;

// Create the context with a type annotation.  The default value is the *name* of the theme, not the theme object itself.
const ThemeContext = createContext<ThemeName>('dark');

// Set the display name for debugging purposes
ThemeContext.displayName = 'ThemeContext';

export { ThemeContext, THEMES, Theme, ThemeName };