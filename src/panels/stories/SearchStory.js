import {
    Avatar,
    Group,
    List,
    Panel,
    PanelHeader,
    PanelSpinner,
    Search,
    Separator,
    SimpleCell
} from "@vkontakte/vkui";
import React, {useContext, useEffect, useState} from "react";
import {ReviewsContext} from "../../Contexts";
import {searchDormitories} from "../../Backend";
import CircularProgressBar from "../components/CircleProgress";


const SearchStory = ({id}) => {
    const [intervalId, setIntervalId] = useState(0)
    const [dormitoriesSearch, setDormitoriesSearch] = useState('');
    const [loading, setLoading] = useState(true)
    const {dormitoryRating, setDormitoryRating} = useContext(ReviewsContext)

    useEffect(() => {
        searchDormitories(dormitoriesSearch)
            .then(res => {
                setDormitoryRating(res.data)
                setLoading(false);
            })
    }, [])


    useEffect(() => {
        clearTimeout(intervalId)
        if (dormitoriesSearch){
            setLoading(true)
            setIntervalId(setTimeout(() => {
                searchDormitories(dormitoriesSearch)
                    .then(res => {
                        setDormitoryRating(res.data)
                        setLoading(false);
                    })
            }, 1000))
        } else {
            searchDormitories(dormitoriesSearch)
                .then(res => {
                    setDormitoryRating(res.data)
                    setLoading(false);
                })
        }
    }, [dormitoriesSearch])


    return(
        <Panel id="search_panel">
            <PanelHeader>Поиск</PanelHeader>

            <Search
                value={dormitoriesSearch}
                onChange={e => {setDormitoriesSearch(e.target.value)}}
            />

            {
                !loading && dormitoryRating ?
                    <Group>
                        <List>
                            {
                                dormitoryRating.map((item, index) => {
                                    return(
                                        <div key={index}>
                                            <SimpleCell
                                                description={item.address}
                                                multiline
                                                before={
                                                    item.photos[0] ?
                                                        <Avatar size={48} src={item.photos[0]}/> :
                                                        <Avatar size={48} src={"https://picsum.photos/200"}/>
                                                }
                                                after={
                                                    <div
                                                        style={{marginLeft: "5px"}}
                                                    >
                                                        <CircularProgressBar
                                                            strokeWidth="4"
                                                            sqSize="40"
                                                            percentage={Math.round(item.rating / 5 * 100)}
                                                            xs={true}
                                                        />
                                                    </div>
                                                }
                                            >
                                                {item.title}
                                            </SimpleCell>
                                            <Separator/>
                                        </div>
                                    )
                                })
                            }
                        </List>
                    </Group>
                    :
                    <PanelSpinner/>
            }
        </Panel>
    )
}

export default SearchStory;