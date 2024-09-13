import { Stack, Typography, StackProps, SxProps, Theme } from "@mui/material";
import { ReactNode, Ref, useCallback } from "react";
import { Helmet } from "react-helmet";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "design/organisms";
import { projectName } from "constants";

import style from "./Page.style";

interface PageProps extends StackProps {
  containerSx?: SxProps<Theme>;
  title?: string;
  children: ReactNode;
  header?: ReactNode;
  head?: ReactNode;
  stackRef?: Ref<unknown>;
  redesigned?: boolean;
}

/**
 * Generic page component
 *
 * This component intended to:
 * - Provide unified layout across the App
 * - Provide error boundaries
 * - Manage page head
 *
 * Recommended for usage as a wrapper for page-level components
 */
export const Page = ({ title, header, sx, children, head }: PageProps) => {
  const renderHeader = useCallback(() => {
    if (header) {
      return header;
    }

    if (title) {
      return (
        <Typography variant="h4" component="h1" sx={style.title}>
          {title}
        </Typography>
      );
    }

    return null;
  }, [title, header]);

  return (
    <ErrorBoundary fallbackRender={() => <Fallback />}>
      <Helmet>
        {head ? (
          head
        ) : (
          <title>
            {title ? `${title} | ${projectName}` : `${projectName}`}
          </title>
        )}
      </Helmet>

      <Stack sx={style.container}>
        {renderHeader()}
        {children}
      </Stack>
    </ErrorBoundary>
  );
};
