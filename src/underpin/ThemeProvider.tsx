import React, { ReactElement, useMemo } from 'react';
import EStyleSheet, { AnyObject } from '@raarts/react-native-extended-stylesheet';
import { useSelector } from 'react-redux';
import { useViewport } from './ViewportProvider';
import { RootState } from '../store';
import themes from '../constants/themes/themes';
import styles from '../constants/themes/styles';

const ThemeContext = React.createContext({});

interface Props {
  children: ReactElement;
}

export const rebuildTheme = (name: string, darkMode: string): void => {
  const styleSheet: AnyObject = Object.assign(themes[name][darkMode], {
    $theme: `${name}/${darkMode}`,
  });
  EStyleSheet.build(styleSheet);
};

const ThemeProvider = ({ children }: Props): React.ReactElement => {
  const renderCounter = React.useRef(1);
  const { viewportWidth, viewportHeight, viewportOrientation, viewportScale } = useViewport();
  const { theme, darkMode } = useSelector((state: RootState) => state.system);

  React.useEffect(() => {
    rebuildTheme(theme, darkMode);
  }, [viewportWidth, viewportHeight, viewportOrientation, viewportScale, darkMode]);

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`${renderCounter.current++} ThemeProvider.tsx: Theme=${theme} darkMode=${darkMode}`);
  }
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
};

const applyTheme = (spec: AnyObject): AnyObject => {
  const { viewportFormFactor, viewportOrientation, viewportScale } = useViewport();
  const { theme, darkMode } = useSelector((state: RootState) => state.system);

  const layoutDataWithScale = { ...styles, $scale: viewportScale, ...spec };
  return useMemo(() => {
    return EStyleSheet.create(layoutDataWithScale);
  }, [theme, darkMode, viewportFormFactor, viewportOrientation, viewportScale, spec]);
};

// Dummy function, but it allows checking unused styles with eslint-plugin-react-native/no-unused-styles
// with setting 'react-native/style-sheet-object-names': ['ThemeProvider'],
ThemeProvider.create = (styleObject: Record<string, unknown>): Record<string, unknown> => styleObject;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
ThemeProvider.value = (expr: any, transparency?: string): any => {
  const value = EStyleSheet.value(expr);
  if (transparency) {
    return value.replace('rgb(', 'rgba(').replace(')', `,${transparency})`);
  }
  return value;
};

export default ThemeProvider;
export { applyTheme };
