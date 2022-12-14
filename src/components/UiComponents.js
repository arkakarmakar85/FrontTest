import { useEffect, useRef, useState } from "react";
import axios from 'axios';


//Custom includes
import { API_BASE_URI } from '../components/CommonConst';

const UiComponents = () => {

    //states
    const [allData, setAllData] = useState(null);
    const [values, setValues] = useState(null);
    const form1 = useRef();

    //All Logic functions

    const handleData = (e) => {
        console.log(e);
        var key = e.target.name;
        var itemValue = e.target.value;
        var value = {...values, [key]:itemValue}
        setValues(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        pushData();
        //console.log(values)
    }

    const pushData = () => {
        axios.post(API_BASE_URI+"push-data", values)
            .then(function (response) {
                alert(response.data.msg)
                getDataFrom();
                form1.current.reset();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
               
            });
    }

    const deleteElement = (name) => {
        axios.post(API_BASE_URI+"del-data", {name: name})
            .then(function (response) {
                getDataFrom();
                form1.current.reset();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    /**
     * Getting data using ajax call 
     */
    const getDataFrom = () => {
        axios.get(API_BASE_URI+"get-data")
            .then(function (response) {
                setAllData(response.data.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    useEffect(() => {
        getDataFrom()
    }, []);

    return (
        <div className="w3-container">
            <h2>Data List</h2>

            {/* Form to add New Data */}
            <form action="/action_page.php" ref={form1}>
                <input type="text" id="name" name="name" placeholder="Your name.." onChange={(e)=>{
                    handleData(e);
                }} />
                <input type="text" id="address" name="address" placeholder="Your address.." onChange={(e)=>{
                    handleData(e);
                }}/>
                <input type="submit" defaultValue="Add" onClick={handleSubmit}/>
            </form>



            {/* if data exists then will print datas */}
            {allData && <ul className="w3-ul">
                {
                    allData.map((item, index) => {
                        return <li key={index}>{item.name} <small>{item.address}</small> 
                                    <a href="javascript:;" onClick={()=> {
                                        deleteElement(item.name)
                                    }} style={{color:'blue'}}>Delete</a> 
                                </li>
                    })
                }

            </ul>}
        </div>
    );
}

export default UiComponents;