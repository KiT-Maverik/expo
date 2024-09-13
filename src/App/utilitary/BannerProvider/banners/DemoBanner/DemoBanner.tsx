import { Alert, Button } from "@mui/material";
import LogIcon from "@mui/icons-material/SmsFailedRounded";

export const DemoBanner = () => {
  return (
    <Alert
      severity="info"
      variant="standard"
      mode="banner"
      action={
        <Button
          variant="outlined"
          startIcon={<LogIcon />}
          onClick={() => console.log('Demo banner says: "Hey!"')}
        >
          Log message
        </Button>
      }
    >
      Lorem ipsum dolor sit amet.
    </Alert>
  );
};
