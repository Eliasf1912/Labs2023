import Nav from './Nav';
import './DatesPage.css';
import { useState, useEffect } from 'react';
import _ from '../firebase-usefull/init.js';
import databaseService from '../firebase-usefull/database.js';

const Main = () => {
    
    const [datesTab, setDatesTab] = useState([]);

    useEffect( () => {
        let tab = [];
        databaseService.readData("dates", (data) => {
            for(const key in data){
                const newdate = {...data[key], id: key}
                tab.push(newdate)
            }
            setDatesTab(tab)
        })

    },[])

    const [formObject, setFormObject] = useState({
        date: "",
        pays: "",
        ville: "",
        adresse: "",
        salle: ""
    })

    const [formEdit,setFormEdit] = useState({
        date: "",
        pays: "",
        ville: "",
        adresse: "",
        salle: ""
    })

    const FormChangeEdit = (event) => {
        const {name, value} = event.target;
        const newFormOject = {...formEdit};
        newFormOject[name] = value;
        setFormEdit(newFormOject);  
    }


    const [Isclicked , setIsClicked] = useState(false)

    const FormChange = (event) => {
        const {name, value} = event.target;
        const newFormOject = {...formObject};
        newFormOject[name] = value;
        setFormObject(newFormOject);  
    }

    const addDates = () => {
        const url = "dates/";
        const data = {
            date: formObject.date,
            pays: formObject.pays,
            ville: formObject.ville,
            salle : formObject.salle,
            adresse: formObject.adresse
        }
        databaseService.writeData(url, data);
        let newFormOject_= {...formObject};
        newFormOject_= {
            date: "",
            pays: "",
            ville: "",
            adresse: "",
            salle: ""
        }
        setFormObject(newFormOject_);
    }

    const removeDates = (id) => {
        const newdatesTab = datesTab.filter(date => date.id !== id)
        setDatesTab(newdatesTab);
        const url = `dates/` + id;
        databaseService.removeData(url);   
    }

    const modifyDates = (id,date) => {
        setIsClicked(true);
        let formEdit_ = {...formEdit}
        formEdit_ = {
            date: date.date,
            pays: date.pays,
            ville: date.ville,
            adresse: date.adresse,
            salle: date.salle
        }
        setFormEdit(formEdit_)
    }

    const validDates = (id,date) => {
        if( formEdit.date !==  date.date || formEdit.pays !==  date.pays || formEdit.salle !==  date.salle || formEdit.ville !==  date.ville || formEdit.adresse !==  date.adresse ){
            const url = "dates/" + id;
            let updates = {
                date: formEdit.date,
                pays: formEdit.pays,
                ville: formEdit.ville,
                adresse: formEdit.adresse,
                salle: formEdit.salle
            }
            databaseService.updateData(url, updates)
            setIsClicked(false);
            console.log("succes");
        }else{
            setIsClicked(false);
        }
    }

    return (  
        <div className='TournePage'>
            <Nav/>
            <div className='Dates-modify'>
                <h1>Ajoutez des dates à la tourner</h1>
                <input type="date" name="date" value={formObject.date} onChange={FormChange}/>                   
                <input type="text" name="pays" value={formObject.pays} placeholder='Pays' onChange={FormChange}/>
                <input type="text" name="salle" value={formObject.salle} onChange={FormChange} placeholder="salle"/>                     
                <input type="text" name="ville" value={formObject.ville} placeholder='Ville' onChange={FormChange}/>
                <input type="text" name="adresse" value={formObject.adresse} placeholder='adresse' onChange={FormChange}/>                    
                <input type="submit" name="submit" value='Ajouter' onClick={() =>{addDates()}}/>               
            </div>
            <div>
                {datesTab.map((date) =>
                    <div className='date-display' key={date.id}>
                        <div className={(Isclicked === true)?"hidden" : "reveal"}>
                            <p>{date.date}</p>
                            <p>{date.pays}</p>
                            <p>{date.ville}</p>
                            <p>{date.salle}</p>
                            <p>{date.adresse}</p>
                        </div>
                        <div className={(Isclicked === true)?"reveal" : "hidden"}>
                            <input type="date" name="date" value={formEdit.date} onChange={FormChangeEdit}/>                   
                            <input type="text" name="pays" value={formEdit.pays} placeholder='Pays' onChange={FormChangeEdit}/>
                            <input type="text" name="salle" value={formEdit.salle} onChange={FormChangeEdit} placeholder="salle"/>                     
                            <input type="text" name="ville" value={formEdit.ville} placeholder='Ville' onChange={FormChangeEdit}/>
                            <input type="text" name="adresse" value={formEdit.adresse} placeholder='adresse' onChange={FormChangeEdit}/>
                            <button onClick={()=>{validDates(date.id,date)}}>Validez</button>
                        </div>
                        <div className='div-button'>
                            <button onClick={()=>{modifyDates(date.id,date)}}>modifier</button>
                            <button onClick={()=>{removeDates(date.id)}}>Supprimer</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Main;