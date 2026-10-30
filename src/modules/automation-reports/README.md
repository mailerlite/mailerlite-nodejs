# Automation reports


### Get automation step run counts
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationReports.getStepRunCounts("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get run counts for an automation step
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationReports.findStepRunCounts("AUTOMATION_ID", "STEP_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get automation trigger run counts
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationReports.getTriggerRunCounts("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get run counts for an automation trigger
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationReports.findTriggerRunCounts("AUTOMATION_ID", "TRIGGER_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### List automation A/B test stats
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationReports.getAbStepsStats("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get automation A/B test stats
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationReports.findAbStepStats("AUTOMATION_ID", "STEP_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### List subscribers on an automation step
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  status: "completed", // completed or queued
  sort: "-date",
  limit: 10,
  page: 1
};

mailerlite.automationReports.getStepSubscribers("AUTOMATION_ID", "STEP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### List subscribers on an automation trigger
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  status: "queued", // completed or queued
  limit: 10,
  page: 1
};

mailerlite.automationReports.getTriggerSubscribers("AUTOMATION_ID", "TRIGGER_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### List automation orders
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  time_frame: "custom",
  time_frame_start: "2026-01-01",
  time_frame_end: "2026-01-31",
  limit: 10,
  page: 1
};

mailerlite.automationReports.getOrderActivity("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get automation email totals
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  start_date: "2026-01-01",
  end_date: "2026-01-31"
};

mailerlite.automationReports.getMonthlyEmailTotals("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get automation e-commerce totals
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  start_date: "2026-01-01",
  end_date: "2026-01-31"
};

mailerlite.automationReports.getMonthlyEcommerceTotals("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
