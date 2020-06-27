import * as React from 'react';
import { Text, TextProps } from './Themed';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';

export function MonoText(props: TextProps): React.ReactElement {
  const { style } = props;
  const styles = applyTheme(localStyles);
  return <Text {...props} style={[style, styles.text]} />;
}

const styles = ThemeProvider.create({
  text: {
    fontFamily: 'space-mono',
  },
});
const localStyles = styles;
