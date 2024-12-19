import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFire } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const FoodLog = () => {
  const [log, setLog] = useState(() => {
    const storedLog = localStorage.getItem('log');
    return storedLog ? JSON.parse(storedLog) : [];
  });
  const [totalCalories, setTotalCalories] = useState(1600);
  const [editing, setEditing] = useState(null);
  const [newName, setNewName] = useState('');
  const [burnedCalories, setBurnedCalories] = useState(0);
  const [date, setDate] = useState(new Date());

  const foodItems = [
    {
      category: "Beverages",
      items: [
        { name: '☕ Coffee', calories: 200 },
        { name: '🥤 Fast-Food Soda', calories: 140 },
        { name: '🍺 Corona', calories: 600 },
        { name: '🥤 Gatorade', calories: 80 },
      ]
    },
    {
      category: "Fruits",
      items: [
        { name: '🍌 Banana', calories: 100 },
        { name: '🍑 Peach', calories: 70 },
        { name: '🥑 Avocado', calories: 250 },
        { name: '🍎 Apple', calories: 95 },
      ]
    },
    {
      category: "Dairy/Eggs",
      items: [
        { name: '🥚 Eggs', calories: 70 },
        { name: '🥣 Yogurt', calories: 80 },
        { name: '🥛 Milk', calories: 150 },
        { name: '🧀 Sliced Cheese', calories: 80 },
        { name: '🧀 Sliced Cheese', calories: 50 },
      ]
    },
    {
      category: "Grains",
      items: [
        { name: '🍞 Whole Wheat Bread', calories: 110 },
        { name: '🍞 Bread', calories: 70 },
      ]
    },
    {
      category: "Fast Food",
      items: [
        { name: '🍔 Big Mac', calories: 550 },
        { name: '🍟 McDonald\'s Fries', calories: 440 },
        { name: '🌯 Quesadillas', calories: 590 },
        { name: '🍚 Bowl', calories: 800 },
        { name: '🌮 Chalupa', calories: 360 },
        { name: '🍔 Whopper', calories: 670 },
        { name: '🍟 BK\'s Fries', calories: 440 },
        { name: '🍔 Chick-fil-A Deluxe Sandwich', calories: 490 },
        { name: '🍔 Chick-fil-A Sandwich', calories: 440 },
        { name: '🐔 Chick-fil-A Strips', calories: 410 },
        { name: '🍞 Chick-fil-A Biscuit', calories: 460 },
        { name: '🍟 Chick-fil-A Fries', calories: 440 },
        { name: '🌶️ Zesty Buffalo', calories: 25 },
        { name: '🍦 Chick-fil-A Shake', calories: 560 },
        { name: '🍋 Chick-fil-A Lemon Shake', calories: 320 },
        { name: '🌯 TB Quesadillas', calories: 510 },
        { name: '🌮 Chalupa', calories: 360 },
        { name: '🥯 Saugage McMuffin', calories: 480 },
        { name: '🐔 McDonald\'s Nuggets', calories: 410 },
      ]
    },
    {
      category: "Desserts",
      items: [
        { name: '🍩 Dunkin Donut', calories: 240 },
        { name: '🍫 Andes Mints', calories: 25 },
        { name: '🌋 Hersheys Kiss', calories: 15 },
        { name: '🍨 Oreo Blazzard', calories: 340 },
      ]
    },

  ];


  useEffect(() => {
    const storedLog = localStorage.getItem('log');
    if (storedLog) {
      const logData = JSON.parse(storedLog);
      const totalCalories = logData.reduce((acc, item) => acc - item.totalCalories, 1600);
      setTotalCalories(totalCalories);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('log', JSON.stringify(log));
  }, [log]);

  const handleAddFood = (foodItem) => {
    const existingItem = log.find((item) => item.name === foodItem.name);
    if (existingItem) {
      setLog((prevLog) => prevLog.map((item) => {
        if (item.name === foodItem.name) {
          return { ...item, count: item.count + 1, totalCalories: item.totalCalories + foodItem.calories };
        }
        return item;
      }));
    } else {
      setLog((prevLog) => [...prevLog, { ...foodItem, count: 1, totalCalories: foodItem.calories }]);
    }
    setTotalCalories((prevTotalCalories) => prevTotalCalories - foodItem.calories);
  };

  const handleDeleteFood = (foodItem) => {
    setLog((prevLog) => prevLog.filter((item) => item.name !== foodItem.name));
    if (foodItem.name === 'Calories Burned') {
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
    const existingBurnedCalories = log.find((item) => item.name === 'Calories Burned');
    if (existingBurnedCalories) {
      setLog((prevLog) => prevLog.map((item) => {
        if (item.name === 'Calories Burned') {
          return { ...item, totalCalories: item.totalCalories + calories };
        }
        return item;
      }));
    } else {
      setLog((prevLog) => [...prevLog, { name: 'Calories Burned', calories: calories, totalCalories: calories }]);
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
  };

  const data = [
    { name: 'Consumed', value: 1600 - totalCalories },
    { name: 'Remaining', value: totalCalories },
  ];

  const remainingCalories = 1600 - totalCalories;

  return (
    <div className="container mt-5">
      <div style={{ textAlign: 'center' }}>
        <h2>
          {date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </h2>
        <button onClick={() => handleDateChange('prev')}>
          &#60;
        </button>
        <button onClick={() => handleDateChange('next')}>
          &#62;
        </button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill={totalCalories >= 1600 ? '#FF0000' : '#4CAF50'}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={totalCalories >= 1600 ? '#FF0000' : index === 0 ? '#4CAF50' : '#3F51B5'} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <h1>Food Log</h1>
      <ul className="list-group">
        {log.map((foodItem, index) => (
          <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
            {editing && editing.name === foodItem.name ? (
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            ) : (
              <span>{foodItem.name} ({foodItem.totalCalories} calories) {foodItem.count > 1 && `x${foodItem.count}`}</span>
            )}
            <div className="d-flex">
              {editing && editing.name === foodItem.name ? (
                <button className="btn btn-success" onClick={() => handleSaveEdit(foodItem)}>Save</button>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={() => handleEditFood(foodItem)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => handleDeleteFood(foodItem)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p>Total Calories Remaining: {totalCalories}</p>
      <button className="btn btn-danger" onClick={handleReset}>Reset</button>


      <h2>Add Food</h2>
      <div className="d-flex flex-wrap">
        {foodItems.map((category, index) => (
          <div key={index} className="m-2">
            <h3>{category.category}</h3>
            {category.items.map((foodItem, itemIndex) => (
              <button key={itemIndex} className="btn btn-primary m-1" onClick={() => handleAddFood(foodItem)}>
                {foodItem.name} ({foodItem.calories} calories)
              </button>
            ))}
          </div>
        ))}
      </div>


      <h2>Burn Calories</h2>
      <div className="d-flex flex-wrap">
        <div className="m-2">
          <button className="btn btn-primary" onClick={() => handleBurnCalories(500)}>
            Burn 500 calories <FontAwesomeIcon icon={faFire} />
          </button>
        </div>
        <div className="m-2">
          <button className="btn btn-primary" onClick={() => handleBurnCalories(100)}>
            Burn 100 calories <FontAwesomeIcon icon={faFire} />
          </button></div><div className="m-2">
          <button className="btn btn-primary" onClick={() => handleBurnCalories(50)}>
            Burn 50 calories <FontAwesomeIcon icon={faFire} />
          </button>
        </div>
        <div className="m-2">
          <button className="btn btn-primary" onClick={() => handleBurnCalories(20)}>
            Burn 20 calories <FontAwesomeIcon icon={faFire} />
          </button></div><div className="m-2">
          <button className="btn btn-primary" onClick={() => handleBurnCalories(10)}>
            Burn 10 calories <FontAwesomeIcon icon={faFire} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default FoodLog;