// Ensure the function is imported or defined in this file
export const valueUpdater = (updaterOrValue: any, refState: any) => {
  if (typeof updaterOrValue === 'function') {
    refState.value = updaterOrValue(refState.value);
  } else {
    refState.value = updaterOrValue;
  }
};
