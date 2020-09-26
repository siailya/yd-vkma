import React, {useContext} from "react";
import {
    Button,
    Div,
    FixedLayout,
    FormLayout,
    FormLayoutGroup,
    Panel,
    PanelHeader,
    SelectMimicry,
} from "@vkontakte/vkui";
import {Navigation, LocationContext} from "../Contexts";
import Icon24UserOutgoing from '@vkontakte/icons/dist/24/user_outgoing';
import {FailedSnackbar, SuccessSnackbar} from "./components/Snackbars";


const LocationPanel = ({id, user}) => {
    const {
        selectedCountry, selectedCity, selectedUniversity,
        setCountry, setCity, setLocationSnackbar, locationSnackbar, setEducation, setUniversity
    } = useContext(LocationContext)
    const {go} = useContext(Navigation)

    return (
        <Panel id={id}>
            <PanelHeader>Расположение</PanelHeader>

            <FormLayout>
                <FormLayoutGroup top="Общая инофрмация" bottom="Расскажите, к какому учебному заведению относится ваше общежитие">
                    <SelectMimicry
                        top="Выберите страну"
                        placeholder="Не выбран"
                        onClick={go}
                        data-goto='addPanel_region_choose'
                    >
                        {selectedCountry.title}
                    </SelectMimicry>

                    <SelectMimicry
                        top="Выберите город"
                        placeholder="Не выбран"
                        onClick={go}
                        data-goto='addPanel_city_choose'
                    >
                        {selectedCity.title}
                    </SelectMimicry>

                    <SelectMimicry
                        top="Выберите ВУЗ"
                        placeholder="Не выбран"
                        onClick={go}
                        data-goto='addPanel_uni_choose'
                    >
                        {selectedUniversity.title}
                    </SelectMimicry>
                </FormLayoutGroup>
            </FormLayout>
            <div style={{display: 'flex'}}>
                <Button
                    mode='outline'
                    style={{color: 'var(--yellow)!important', margin: 'auto'}}
                    onClick={() => {
                        setEducation().then(() => {
                            try {
                                if (user.country && user.city && user.university) {
                                    setCountry(user.country)
                                    setCity(user.city)
                                    setUniversity(user.university)
                                    setLocationSnackbar(<SuccessSnackbar caption="Данные успешно заполнены!"
                                                                         onClose={setLocationSnackbar}
                                                                         duration={700}/>)
                                } else {
                                    if (user.country){
                                        setCountry(user.country)
                                    }
                                    if (user.city){
                                        setCity(user.city)
                                    }
                                    if (user.university){
                                        setUniversity(user.university)
                                    }
                                    setLocationSnackbar(<FailedSnackbar caption="В профиле не хватает информации, заполните недостающие поля вручную"
                                                                        onClose={setLocationSnackbar}/>)
                                }
                            } catch (e) {
                                setLocationSnackbar(<FailedSnackbar caption="Что-то пошло не так... Заполните данные вручную"
                                                                    onClose={setLocationSnackbar}/>)
                            }
                        }
                        )
                    }}
                    before={<Icon24UserOutgoing/>}
                >
                    Заполнить из профиля
                </Button>
            </div>

            <FixedLayout vertical="bottom">
                <Div>
                    <Button
                        size='xl'
                        stretched
                        className='yellow-gradient'
                        data-goto='addPanel_dormitory_panel'
                        onClick={go}
                        disabled={!(selectedCountry && selectedCity && selectedUniversity)}
                    >
                        Дальше
                    </Button>
                </Div>
            </FixedLayout>
            {locationSnackbar}
        </Panel>
    )
}

export default LocationPanel;