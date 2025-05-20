import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row , Divider , DatePicker, Checkbox} from 'antd'
import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
const {RangePicker} = DatePicker
function Home() {
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCars , setTotalcars] = useState([])
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {

        setTotalcars(cars)
        
    }, [cars])


    function setFilter(values){

        var selectedFrom = moment(values[0] , 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1] , 'MMM DD yyyy HH:mm')

        var temp=[]

        for(var car of cars){

              if(car.bookedTimeSlots.length == 0){
                  temp.push(car)
              }
              else{

                   for(var booking of car.bookedTimeSlots) {

                       if(selectedFrom.isBetween(booking.from , booking.to) ||
                       selectedTo.isBetween(booking.from , booking.to) || 
                       moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                       moment(booking.to).isBetween(selectedFrom , selectedTo)
                       )
                       {

                       }
                       else{
                           temp.push(car)
                       }

                   }

              }

        }


        setTotalcars(temp)


    }

    return (
        <DefaultLayout>

             <Row className='mt-3' justify='center'>
                 
                 <Col lg={20} sm={24} className='d-flex justify-content-left'>

                     <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={setFilter}/>
                 
                 </Col>

             </Row>

              {loading == true && (<Spinner/>)}


              
              <Row justify='center' gutter={16}>

                   {totalCars.map(car=>{
                       return(
                        <div>
                    <Card maxW='sm'>
                       <CardBody>
                         <Image
                           src={car.image}
                           borderRadius='lg'
                         />
                         <Stack mt='6' spacing='3'>
                           <Heading size='md'>{car.name}</Heading>
                           <Text color='blue.600' fontSize='2xl'>
                             Rent per Hour: {car.rentPerHour}
                           </Text>
                         </Stack>
                       </CardBody>
                       <Divider />
                       <CardFooter>
                         <ButtonGroup spacing='2'>
                           <Button variant='solid' colorScheme='blue'>
                             Book now
                           </Button>
                         </ButtonGroup>
                       </CardFooter>
                     </Card>
                     </div>
                       )
                   })}

              </Row>

        </DefaultLayout>
    )
}

export default Home
