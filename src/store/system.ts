import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rebuildTheme } from '../underpin/ThemeProvider';

interface CurrentSystem {
  darkMode: string;
  theme: string;
}
type CurrentSystemState = {
  // other parameters here
} & CurrentSystem;

const initialState: CurrentSystemState = {
  darkMode: 'light',
  theme: 'default',
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<string>): CurrentSystemState => {
      rebuildTheme(state.theme, action.payload);
      return {
        ...state,
        darkMode: action.payload,
      };
    },
    themeBuild: (state): CurrentSystemState => {
      rebuildTheme(state.theme, state.darkMode);
      return {
        ...state,
      };
    },
  },
});

export const { setDarkMode, themeBuild } = systemSlice.actions;

export default systemSlice.reducer;
