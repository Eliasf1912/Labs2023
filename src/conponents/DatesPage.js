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

    const FormChange = (event) => {
        const {name, value} = event.target;
        const newFormOject = {...formObject};
        newFormOject[name] = value;
        setFormObject(newFormOject);  
    }

    const addDates = () => {
        const url = "dates/" + formObject.date;
        const data = {
            date: formObject.date,
            pays: formObject.pays,
            ville: formObject.ville,
            adresse: formObject.adresse,
            salle: formObject.salle
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
    }

    return (  
        <div className='TournePage'>
            <Nav/>
            <div className='Dates-modify'>
                <h1>Ajoutez des dates à la tourner</h1>
                <input type="date" name="date" value={formObject.date} onChange={FormChange}/>                   
                <input type="text" name="pays" value={formObject.pays} placeholder='Pays' onChange={FormChange}/>
                <input type="text" name="ville" value={formObject.ville}  placeholder="Ville" onChange={FormChange}/>                     
                <input type="text" name="adresse" value={formObject.adresse} placeholder='adresse ' onChange={FormChange}/>
                <input type="text" name="salle" value={formObject.salle} placeholder='salle' onChange={FormChange}/>                    
                <input type="submit" name="submit" value='Ajouter' onClick={addDates}/>               
            </div>
            <div>
                
                <table className='dataTable'>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>PAYS</th>
                        <th>VILLE</th>
                        <th>ADRESSE</th>
                        <th>SALLE</th>
                        <th>MODIFIER</th>
                        <th>SUPPRIMER</th>
                    </tr>
                </thead>
                {datesTab.map((date) =>
                <tbody key={date.id}>
                    <tr>
                        <td>{date.date}</td>
                        <td>{date.pays}</td>
                        <td>{date.ville}</td>
                        <td>{date.adresse} </td>
                        <td>{date.salle}</td>
                        <td>
                            <button className="button action">modifier</button>
                        </td>
                        <td>
                            <button onClick={()=>removeDates(date.id)}>Supprimer</button>
                        </td>
                    </tr>
                </tbody>
                )}

                </table>
                
            </div>
        </div>
    );
}
 
export default Main;