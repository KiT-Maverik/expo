import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const normalizeSxProps = (
  sxPropsList: Array<SxProps<Theme> | undefined>,
): SxProps<Theme>[] => {
  let result: SxProps<Theme> = {};

  for (let i = 0; i < sxPropsList.length; i++) {
    const currentStyle = sxPropsList[i];

    if (!currentStyle) continue;
    else if (Array.isArray(currentStyle)) result = [...result, ...currentStyle];
    else result = { ...result, ...[currentStyle] };
  }
  return result;
};

// [
//     style.container,
//     ...(Array.isArray(containerStyle)
//         ? containerStyle
//         : [containerStyle]),
// ]
