import React, { useState } from "react"
import {
    Button,
    AlbaButton,
    Dialog,
    ShowSnackbar,
    TextForm,
    DraggableModal,
    DialogTitle,
    Typography,
    Icon,
    fileNameAndFolderNameValidation,
    jobNameValidation,
    FolderForm,
    FormControlLabel,
    Checkbox
  } from '@platform/service-ui-libraries';
function Test2(){
    const [useDefault, setUseDefault] = useState(false);
    return(
        <div>
            <FormControlLabel
              value={useDefault}
              control={<Checkbox />}
              label="Use Default Folder Format"
              data-test-id="default-checkbox-button"
              className="__check_default"
              onChange={() => {
                setUseDefault(!useDefault);
              }}
            />
        </div>
    )
}
export default Test2;