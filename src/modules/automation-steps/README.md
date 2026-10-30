# Automation steps


### List automation steps
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationSteps.get("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get an automation step
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationSteps.find("AUTOMATION_ID", "STEP_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create an automation step
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  type: "delay",
  parent_id: "PARENT_STEP_ID",
  data: {
    unit: "days",
    value: 2
  }
};

mailerlite.automationSteps.create("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update an automation step
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  data: {
    unit: "days",
    value: 3
  }
};

mailerlite.automationSteps.update("AUTOMATION_ID", "STEP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete an automation step
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  branch_to_delete: "all" // only for condition and A/B test steps
};

mailerlite.automationSteps.delete("AUTOMATION_ID", "STEP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Duplicate an automation step
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  parent_id: "PARENT_STEP_ID"
};

mailerlite.automationSteps.copy("AUTOMATION_ID", "STEP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Move an automation step
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  dragged_step_id: "STEP_ID",
  new_parent_step_id: "NEW_PARENT_STEP_ID"
};

mailerlite.automationSteps.reorder("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Select the winner of an A/B test step
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  ab_test_winner: "a_path"
};

mailerlite.automationSteps.selectAbTestWinner("AUTOMATION_ID", "STEP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
