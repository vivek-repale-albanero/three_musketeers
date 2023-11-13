import React, { useState } from "react"
import * as
x
   from '@platform/service-ui-libraries';
   import { AlbaButtonFileBasket,AlbaCopyOptions,AlbaStatusBar,Icon,Alert,Avatar,Badge,Button,SelectForm } from '@platform/service-ui-libraries';
function Test2(){
    console.log("platform",x)
    const copyOptionsList = [
        { id: 1, optionName: 'Copy File Path', copyText: "pritam" },
        { id: 2, optionName: 'Copy File Name', copyText: "prit" }
      ];
    return(
        <div>
          <SelectForm
            label="Select Country"
            // ref={(e) => (ValidationRef.current[1] = e)}
            // validationsDetail={{
            //   validations: {
            //     required: true,
            //     whiteSpace: true,
            //   },
            // }}
            onChange={(e) => setformdata({ ...formdata, countryName: e })}
            options={Counteryoption}
            placeholder="Countery Name"
            fieldValue={formdata.countryName}
          />
          <Button>button</Button>
                                              <Badge
                                      badgeContent={"badge"}
                                      color={'primary'}
                                      // style={{ marginTop: `${item?.label == '' ? '-8px' : ''}` }}
                                    ></Badge>
                  <Alert className="_alert_message" severity="info" color="success">
            {`“(Blank)” indicates an empty data`}
          </Alert>
          <Avatar>p</Avatar>
      <AlbaButtonFileBasket
        dataTestId="inspect-and-repair-start-button"
        variant="success"
        icon="construction"
        onClick={() => console.log("slect file")}
        multiselect={true}
        startJobFunction={()=>console.log('job start')}
      >
        Inspect & Repair
      </AlbaButtonFileBasket>
      <AlbaCopyOptions copyOptions={copyOptionsList} />
      <AlbaStatusBar variant="running">
              <Icon title="title" fontSize="small">
                info
              </Icon>
            
          </AlbaStatusBar>
        </div>
    )
}
export default Test2;