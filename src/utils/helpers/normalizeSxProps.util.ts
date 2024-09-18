import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const normalizeSxProps = (
  sxPropsList: Array<SxProps<Theme> | undefined>,
): SxProps<Theme> => ({});

// [
//     style.container,
//     ...(Array.isArray(containerStyle)
//         ? containerStyle
//         : [containerStyle]),
// ]

/*

I have. a problem with mui 6 sx prop. when I need to pass several styles in sx prop as array
<Stack sx={[style.container, containerStyle]}>
I get a type error `TS2769: No overload matches this call`. I've found a workaround - it looks like this
    ```jsx
    <Stack
sx={[
      style.container,
  ...(Array.isArray(containerStyle)
      ? containerStyle
      : [containerStyle]),
]}
>
    ```
. I want to utilise this approach in a utility function of type  (sxPropsList: Array<SxProps<Theme> | undefined>): SxProps<Theme>.
    It sould go through sxPropsList array and apply to each element my workaround. As a result it should return valid SxProps<Theme>[] compatible with mui components sx prop.
    Can you help me with that?
*/
