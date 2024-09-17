import { Stack, Typography, StackProps, SxProps, Theme } from "@mui/material";
import { ReactNode, useCallback } from "react";
import { Helmet } from "react-helmet";
import { ErrorBoundary } from "react-error-boundary";

import { projectName } from "App";
import { ErrorPage } from "design/pages";

import style from "./Page.style";

interface PageProps extends StackProps {
  title?: string;
  children: ReactNode;
  header?: ReactNode;
  head?: ReactNode;
  containerStyle?: SxProps<Theme>;
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
export const Page = ({
  title,
  header,
  containerStyle,
  children,
  head,
}: PageProps) => {
  const renderHeader = useCallback(() => {
    if (header) {
      return header;
    }

    if (title) {
      return (
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      );
    }

    return null;
  }, [title, header]);

  return (
    <ErrorBoundary fallbackRender={() => <ErrorPage />}>
      <Helmet>
        {head ? (
          head
        ) : (
          <title>
            {title ? `${title} | ${projectName}` : `${projectName}`}
          </title>
        )}
      </Helmet>

      <Stack
        sx={[
          style.container,
          ...(Array.isArray(containerStyle)
            ? containerStyle
            : [containerStyle]),
        ]}
      >
        {renderHeader()}
        {children}
      </Stack>
    </ErrorBoundary>
  );
};
