import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFire, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { foodItems } from './foodItems';
import CalorieChart from './CalorieChart'; // Import CalorieChart

const FoodLog = () => {
const [log, setLog] = useState(() => {
const storedLog = localStorage.getItem(`log-${new Date().toISOString().split('T')[0]}`);
if (storedLog) {
return JSON.parse(storedLog);
} else {
return [
{ name: '☕ Coffee', calories: 200, count: 1, totalCalories: 200 },
{ name: '🔥 Burnt', calories: 0, count: 1, totalCalories: 0 },
];
}
});

const [totalCalories, setTotalCalories] = useState(() => {
const storedLog = localStorage.getItem(`log-${new Date().toISOString().split('T')[0]}`);
if (storedLog) {
const logData = JSON.parse(storedLog);
return logData.reduce((acc, item) => acc - item.totalCalories, 1600);
} else {
return 1400; // Adjusted total calories to reflect default coffee log
}
});

const [editing, setEditing] = useState(null);
const [newName, setNewName] = useState('');
const [burnedCalories, setBurnedCalories] = useState(0);
const [date, setDate] = useState(new Date());

useEffect(() => {
const storedLog = localStorage.getItem(`log-${date.toISOString().split('T')[0]}`);
if (storedLog) {
const logData = JSON.parse(storedLog);
const totalCalories = logData.reduce((acc, item) => acc - item.totalCalories, 1600);
setTotalCalories(totalCalories);
setLog(logData);
} else {
setLog([
{ name: '☕ Coffee', calories: 200, count: 1, totalCalories: 200 },
{ name: '🔥 Burnt', calories: 0, count: 1, totalCalories: 0 },
]);
setTotalCalories(1400); // Adjusted total calories to reflect default coffee log
}
}, [date]);

useEffect(() => {
localStorage.setItem(`log-${date.toISOString().split('T')[0]}`, JSON.stringify(log));
}, [log, date]);

const handleAddFood = (foodItem) => {
  const existingItem = log.find((item) => item.name === foodItem.name);

  if (existingItem) {
    setLog((prevLog) =>
      prevLog.map((item) => {
        if (item.name === foodItem.name) {
          return {
            ...item,
            count: item.count + 1,
            totalCalories: item.totalCalories + foodItem.calories,
          };
        }
        return item;
      })
    );
  } else {
    // Check if the item is '☕ Coffee' and move it to the top of the list
    if (foodItem.name === '☕ Coffee') {
      setLog((prevLog) => [{ ...foodItem, count: 1, totalCalories: foodItem.calories }, ...prevLog]);
    } else {
      setLog((prevLog) => [...prevLog, { ...foodItem, count: 1, totalCalories: foodItem.calories }]);
    }
  }

  setTotalCalories((prevTotalCalories) => prevTotalCalories - foodItem.calories);
};



const handleDeleteFood = (foodItem) => {
setLog((prevLog) => prevLog.filter((item) => item.name !== foodItem.name));
if (foodItem.name === '🔥 Burnt') {
setTotalCalories((prevTotalCalories) => prevTotalCalories - foodItem.totalCalories);
} else {
setTotalCalories((prevTotalCalories) => prevTotalCalories + foodItem.totalCalories);
}
};

const handleReset = () => {
setLog([]);
setTotalCalories(1600);
};

const handleEditFood = (foodItem) => {
setEditing(foodItem);
setNewName(foodItem.name);
};

const handleSaveEdit = (foodItem) => {
setLog((prevLog) => prevLog.map((item) => {
if (item.name === foodItem.name) {
return { ...item, name: newName };
}
return item;
}));
setEditing(null);
};

const handleBurnCalories = (calories) => {
setBurnedCalories((prevBurnedCalories) => prevBurnedCalories + calories);
const existingBurnedCalories = log.find((item) => item.name === '🔥 Burnt');
if (existingBurnedCalories) {
setLog((prevLog) => {
const burnedCaloriesItem = prevLog.find((item) => item.name === '🔥 Burnt');
burnedCaloriesItem.totalCalories += calories;
return [...prevLog.filter((item) => item.name !== '🔥 Burnt'), burnedCaloriesItem];
});
} else {
setLog((prevLog) => [...prevLog, { name: '🔥 Burnt', calories: calories, totalCalories: calories }]);
}
setTotalCalories((prevTotalCalories) => prevTotalCalories + calories);
};

const handleDateChange = (direction) => {
const newDate = new Date(date);
if (direction === 'prev') {
newDate.setDate(newDate.getDate() - 1);
} else if (direction === 'next') {
newDate.setDate(newDate.getDate() + 1);
}
setDate(newDate);
setLog([]);
setTotalCalories(1600);
};

const data = [
{ name: 'Consumed', value: 1600 - totalCalories },
{ name: 'Remaining', value: totalCalories },
];

const remainingCalories = 1600 - totalCalories;

return (
<div className="container mt-5">
<div style={{ textAlign: 'center' }}>
<div className="input-group input-group-sm mb-3" style={{ justifyContent: 'center', borderRadius: '0.25rem' }}>
<div className="input-group-prepend">
<button className="btn btn-secondary" style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }} onClick={() => handleDateChange('prev')}>
<FontAwesomeIcon icon={faArrowLeft} />
</button>
</div>
<input type="text" className="form-control text-center" style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }} value={date.toLocaleDateString('en-US', {
month: 'long',
day: 'numeric',
})} readOnly />
<div className="input-group-append">
<button className="btn btn-secondary" style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }} onClick={() => handleDateChange('next')}>
<FontAwesomeIcon icon={faArrowRight} />
</button>
</div>
</div>
</div>

<div style={{
textAlign: 'center',
display: 'flex',
justifyContent: 'center',
marginTop: '-20px',
marginBottom: '10px',
}}>
<CalorieChart data={data} totalCalories={totalCalories} />
</div>

<ul className="list-group">
{log.map((foodItem, index) => (
<li key={index} className="list-group-item d-flex align-items-center justify-content-between">
{editing && editing.name === foodItem.name ? (
<input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
) : (
<span>{foodItem.name} ({foodItem.totalCalories}) {foodItem.count > 1 && `x${foodItem.count}`}</span>
)}
<div className="d-flex">
{editing && editing.name === foodItem.name ? (
<button className="btn btn-success btn-sm" onClick={() => handleSaveEdit(foodItem)}>Save</button>
) : (
<>
<button className="btn btn-primary btn-sm" onClick={() => handleEditFood(foodItem)}>
<FontAwesomeIcon icon={faEdit} />
</button>
&nbsp;
<button className="btn btn-danger btn-sm" onClick={() => handleDeleteFood(foodItem)}>
<FontAwesomeIcon icon={faTrash} />
</button>
</>
)}
</div>
</li>
))}
</ul>

<p className="mt-4" style={{ textAlign: 'center' }}>Total Calories Remaining: {totalCalories}</p>
<p style={{ textAlign: 'center' }}>Total Calories Consumed: {1600 - totalCalories}</p>

{foodItems.map((category, index) => (
<div key={index} className="m-2">
<h3 style={{ textAlign: 'center', paddingBottom: '10px' }}>{category.category}</h3>
<div className="d-flex flex-wrap justify-content-center">
{category.items.map((foodItem, itemIndex) => (
<button key={itemIndex} className="btn btn-primary m-1 food-button" onClick={() => handleAddFood(foodItem)}>
{foodItem.name} ({foodItem.calories})
</button>
))}
</div>
<br />
</div>
))}
<h3 style={{ textAlign: 'center', paddingBottom: '20px' }}>Burn Calories</h3>
<div className="d-flex flex-wrap justify-content-center">
<div className="m-2">
<button className="btn btn-primary" onClick={() => handleBurnCalories(500)}>
Burn 500 <FontAwesomeIcon icon={faFire} />
</button>
</div>
<div className="m-2">
<button className="btn btn-primary" onClick={() => handleBurnCalories(100)}>
Burn 100 <FontAwesomeIcon icon={faFire} />
</button>
</div>
<div className="m-2">
<button className="btn btn-primary" onClick={() => handleBurnCalories(50)}>
Burn 50 <FontAwesomeIcon icon={faFire} />
</button>
</div>
<div className="m-2">
<button className="btn btn-primary" onClick={() => handleBurnCalories(20)}>
Burn 20 <FontAwesomeIcon icon={faFire} />
</button>
</div>
<div className="m-2">
<button className="btn btn-primary" onClick={() => handleBurnCalories(10)}>
Burn 10 <FontAwesomeIcon icon={faFire} />
</button>
</div>
</div>
<button className="btn btn-danger mt-4 w-100" onClick={handleReset} style={{ textAlign: 'center' }}>Reset</button>
</div>
);
};

export default FoodLog;