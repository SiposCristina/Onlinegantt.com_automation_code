import { test, expect } from '@playwright/test';
const testdata = JSON.parse(JSON.stringify(require("../testdata8.json")))
const { chromium } = require('playwright');
const fs = require('fs');


test('test', async ({ page }) => {
  
  await page.goto('https://www.onlinegantt.com/#/gantt'); 
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  //await page.waitForTimeout(1000);
  

  for (const task of testdata.tasks) {
    await page.getByLabel('Add', { exact: true }).click();
    const taskName = task.name; 
    const startDate = task.startDate;
    const endDate = task.endDate;
    const progress = task.progress;

    //set task name
	await page.getByLabel('Task Name', { exact: true }).fill(task.name);

    //set start date
    await page.getByLabel('Start', { exact: true }).fill("");
    await page.getByLabel('Start', { exact: true }).fill(startDate);
    
    //set end date
    await page.getByLabel('End', { exact: true }).fill("");
    await page.getByLabel('End', { exact: true }).fill(endDate);

    //set progress
    await page.getByLabel('Progress %', { exact: true }).fill('')
    const progressField = await page.getByLabel('Progress %', { exact: true });
    
    //await progressField.click();
    await progressField.fill(progress);

    //save the task
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    
    //short delay between adding tasks
    await page.waitForTimeout(500);
  }
  
 
    //indent subtasks
   for (const taskName of testdata.tasksToIndent) {
      await page.waitForTimeout(400);
      await page.getByText(taskName, {exact:true}).click();
      await page.locator("#GanttContainer_indent").click();
    }

    //set the dependencies
    for (const dandn of testdata.createDependencies) {
    const taskName = dandn.taskName;
    const dependency = dandn.dependency;
    const type = dandn.type;
    const notes = dandn.notes;

	  //click on task information
    await page.locator("span").filter({hasText: dandn.taskName, exact: true}).click({button: 'right'});
    await page.getByRole('menuitem', { name: ' Task Information' }).click();

	  //set task to depend upon
    await page.getByLabel('tab-header').getByText("Dependency").click(); 
    await page.getByLabel('Dependency', { exact: true }).getByLabel('Add').click();
    await page.locator("#GanttContainerDependencyTabContainername").fill(dandn.dependency);
    await page.locator('#GanttContainerDependencyTabContainername').press('Enter');
    //await page.waitForTimeout(500);

	  //set dependency type and notes
    await page.getByRole('combobox', { name: "Finish-Start" }).locator('span').click();
    await page.getByRole("option", {name: dandn.type}).dispatchEvent("click");
    await page.getByText('Notes').click();
    await page.locator('#GanttContainerNotesTabContainer_rte-edit-view').fill(dandn.notes);
    await page.getByRole('button', { name: 'OK' }).click();
    }

  //create resources 
  await page.locator('#view').selectOption('Edit Resources');
  await page.locator("[value='']").first().click();
  await page.locator("[value='']").first().fill('Team 1');
  await page.locator("[value='']").first().click();
  await page.locator("[value='']").first().fill('Team 2');
  await page.locator("[value='']").first().click();
  await page.locator("[value='']").first().fill('Team 3');
  await page.locator('#view').selectOption('Project View');

 
  for (const item of testdata.setResources) {
    const task = item.task;
    const resource = item.resource;

	//set resource
    await page.getByText(item.task, { exact: true }).click({button: 'right'});
    await page.getByRole('menuitem', { name: ' Task Information' }).click();
    await page.getByLabel('tab-header').getByText('Resources').click();
    await page.getByRole('row', { name: item.resource }).locator('span').first().click();
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    }

    await page.screenshot({ path: 'Screenshot of the Mastertask 2.png' });

    await page.getByText("Master Task 1").click();

    await page.screenshot({ path: 'Screenshot of the Mastertask 1.png' });
    await page.waitForTimeout(1000);
   
  //export data
  for (const file of testdata.files){
    const fileName = file.fileName;
    const fileType = file.fileType;

    await page.getByRole('button', { name: 'Import / Export' }).dispatchEvent("click");
   

    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
      });

    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('menuitem', { name: file.fileName }).dispatchEvent("click");
	  await page.waitForTimeout(500);
    if (file.fileName == 'Export to Excel File')
	{
		await page.getByRole('button', { name: 'OK' }).click();
		//await page.waitForTimeout(1000);
	}
	else
	{
      await page.getByRole('button', { name: 'Export', exact: true }).dispatchEvent("click");
      //await page.waitForTimeout(1000); 
    }
    
    const download = await downloadPromise;
   
    const date= new Date();
    let month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    let day = date.getDate();

    await download.saveAs(`./downloads-${day}${month}/before/${file.fileType}`);
    }
    
    //await page.pause() 
     
    const newTasks = [["New Master Task 1",""],
                      ["New Subtask MT1 1",""],
                      ["New Subtask MT1 2","Start-Start","Start-Finish"],
                      ["New Subtask MT1 3","Finish-Finish","Finish-Start"],
                      ["New Master Task 2",""],
                      ["New Subtask MT2 1",""],
                      ["New Subtask MT2 2","Finish-Start","Start-Start"], 
                      ["New Subtask MT2 3","Start-Finish","Finish-Finish"]]
      
    for (let i = 0; i < newTasks.length; i++) {
   
      await page.locator("span").filter({hasText: testdata.tasks[i].name, exact: true}).click({button: 'right'});
      await page.getByRole('menuitem', { name: ' Task Information' }).click();
      await page.getByLabel('Task Name', { exact: true }).click();
      await page.getByLabel('Task Name', { exact: true }).fill('');
      await page.getByLabel('Task Name', { exact: true }).fill(newTasks[i][0]);
            
      if (newTasks[i][1]!=""){
        await page.getByLabel('tab-header').getByText("Dependency").click();
        await page.getByRole('rowgroup').nth(6).dblclick();
        await page.waitForTimeout(500);
          
        await page.getByRole('combobox', { name: newTasks[i][2]}).locator('span').click();
        await page.getByRole("option", {name: newTasks[i][1]}).dispatchEvent("click");
        }
        await page.getByRole('button', { name: 'OK' }).click(); 
    }
     
    await page.locator('#view').selectOption('Project View');
    await page.locator('#view').selectOption('Edit Settings');
    await page.getByLabel('Sunday').check();

    //await page.pause();

    await page.locator('.e-datepicker').first().click();
    await page.locator('.e-datepicker').first().fill('2024-08-24');
    await page.locator('.e-datepicker').nth(1).click();
    await page.locator('.e-datepicker').nth(1).fill('2024-08-28');  
    await page.locator('.e-datepicker').nth(2).click();
    await page.locator('.e-datepicker').nth(2).fill('2024-09-18');  
    await page.locator('.e-datepicker').nth(3).click();
    await page.locator('.e-datepicker').nth(3).fill('2024-09-22');  
    await page.locator('.e-datepicker').nth(4).click();
    await page.waitForTimeout(1000);

    await page.locator('#view').selectOption('Project View');

    await page.screenshot({ path: 'Screenshot of the New Mastertask 1.png' });

    await page.getByText("New Subtask MT2 1").click();

    await page.screenshot({ path: 'Screenshot of the New Mastertask 2.png' });
    await page.waitForTimeout(1000);
    
    
    const exportOptions = [
      { name: 'Export to Excel File', fileN: "Export_to_Excel_File.csv"},
      { name: 'Export to PDF File', fileN: "Export_to_PDF_File.pdf"},
      { name: 'Export to Image File', fileN: "Export_to_Image_File.png"}
    ];
    
    for (let option of exportOptions) {
      //Click 'Import / Export' button
      await page.getByRole('button', { name: 'Import / Export' }).dispatchEvent("click");

       //Wait for the download event
       const downloadPromise = page.waitForEvent("download");
    
      //Click the corresponding export menu item
      await page.getByRole('menuitem', { name: option.name }).dispatchEvent("click");

      if (option.name == 'Export to Excel File')
        {
          await page.getByRole('button', { name: 'OK' }).click();
          //await page.waitForTimeout(1000);
      
        }
        else
        {
          await page.getByRole('button', { name: 'Export', exact: true }).dispatchEvent("click");
            //await page.waitForTimeout(1000); 
          }
          
          const download = await downloadPromise;
        
        const date= new Date();
        let month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
        let day = date.getDate();
    
        await download.saveAs(`./downloads-${day}${month}/after/${option.fileN}`);
        }
  });