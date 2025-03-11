import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Prakash Sharma',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS, MD (General Medicine)',
        experience: '4 Years',
        about: 'Dr. Prakash Sharma is a dedicated medical professional with extensive experience in diagnosing and treating a variety of health conditions. His expertise lies in preventive care, effective treatment plans, and providing compassionate healthcare to his patients. He is committed to improving community health through personalized and evidence-based medical care.',
        fees: 2000,
        address: {
            line1: 'Ward No. 5, Putalisadak',
            line2: 'Kathmandu, Nepal'

        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Sita Bhandari',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Gynecology and Obstetrics)',
        experience: '3 Years',
        about: 'Dr. Sita Bhandari specializes in womens health, with a focus on providing comprehensive gynecological and obstetric care. She is passionate about offering support throughout pregnancy, childbirth, and postpartum recovery. Dr. Bhandari is known for her empathetic approach and dedication to empowering women to make informed decisions about their health.',
        fees: 2500,
        address: {
            line1: 'Ward No. 10, New Baneshwor',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Rihan Shrestha',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '1 Year',
        about: 'Dr. Rihan Shrestha is a skilled dermatologist who focuses on diagnosing and treating various skin conditions, including acne, eczema, and psoriasis. With her patient-centered approach, she is dedicated to helping individuals achieve healthy, glowing skin. Dr. Shrestha is also committed to providing education on skin health and personalized treatment plans for her patients.',
        fees: 1500,
        address: {
            line1: 'Ward No. 3, Jhamsikhel',
            line2: 'Lalitpur, Nepal'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Arjun Koirala',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '2 Years',
        about: 'Dr. Arjun Koirala is a highly skilled pediatrician committed to the health and well-being of children. With a focus on providing personalized care, he has extensive experience in treating illnesses and ensuring healthy development. Dr. Koirala works closely with parents, offering guidance and preventive strategies to foster long-term health for young patients.',
        fees: 1800,
        address: {
            line1: 'Ward No. 8, Kupondole',
            line2: 'Lalitpur, Nepal'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Ritika Adhikari',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '4 Years',
        about: 'Dr. Ritika Adhikari is an expert neurologist with significant experience in diagnosing and treating disorders of the nervous system. He is dedicated to providing exceptional care for patients with neurological conditions, ranging from migraines to complex brain disorders. Dr. Adhikari emphasizes patient education and personalized treatment plans to ensure optimal outcomes.',
        fees: 3000,
        address: {
            line1: 'Ward No. 15, Maharajgunj',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Sujan Thapa',
        image: doc6,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastroenterology)',
        experience: '4 Years',
        about: 'Dr. Sujan Thapa is a highly skilled gastroenterologist with extensive experience in diagnosing and treating a variety of gastrointestinal conditions. His expertise includes managing disorders such as acid reflux, irritable bowel syndrome, liver diseases, and inflammatory bowel diseases. Dr. Thapa is committed to providing compassionate, patient-centered care using the latest medical advancements.',
        fees: 3000,
        address: {
            line1: 'Ward No. 13, Bansbari',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Ramesh Adhikari',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS, MD (General Medicine)',
        experience: '4 Years',
        about: 'Dr. Ramesh Adhikari is a dedicated general physician with expertise in preventive medicine, health screenings, and managing chronic conditions. He is committed to providing personalized care and ensuring his patients achieve optimal health. With his empathetic approach, Dr. Adhikari strives to build long-term trust and promote overall well-being within the community.',
        fees: 2000,
        address: {
            line1: 'Ward No. 7, Chabahil',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Suman Rai',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Obstetrics and Gynecology)',
        experience: '3 Years',
        about: 'Dr. Suman Rai is a dedicated gynecologist with a passion for women\'s health. She specializes in providing comprehensive care, from routine check-ups to complex treatments. With a focus on preventive care and early diagnosis, Dr. Rai ensures her patients receive personalized attention. She is committed to offering the latest and most effective treatment strategies in obstetrics and gynecology, aiming for the well-being of women at every stage of life.',
        fees: 3000,
        address: {
            line1: 'Near Pashupatinath Temple',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Priya Sharma',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '1 Years',
        about: 'Dr. Priya Sharma is a skilled dermatologist with a focus on skin health. She is dedicated to offering treatments for various skin conditions, using advanced techniques and a patient-centered approach. Dr. Sharma emphasizes the importance of early detection and preventive care in maintaining healthy skin.',
        fees: 2500,
        address: {
            line1: 'Near Fewa Lake ',
            line2: 'Pokhara, Nepal'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Anjan Thapa',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '2 Years',
        about: 'Dr. Anjan Thapa is a compassionate pediatrician dedicated to providing high-quality medical care to children. She focuses on early diagnosis, preventive care, and effective treatment strategies for a wide range of pediatric conditions. Dr. Thapa ensures that each child receives personalized attention in a comfortable and supportive environment.',
        fees: 3000,
        address: {
            line1: 'Near Mechi Bridge ',
            line2: 'Biratnagar, Nepal'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Alisha Koirala',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS, MD (Neurology)',
        experience: '4 Years',
        about: 'Dr. Alisha Koirala is an experienced neurologist dedicated to diagnosing and treating a wide range of neurological disorders. She is committed to offering comprehensive care through early diagnosis and personalized treatment strategies. Dr. Koirala works closely with her patients to ensure effective management of conditions like epilepsy, migraines, and neurodegenerative diseases.',
        fees: 4000,
        address: {
            line1: 'Near Patan Durbar Square',
            line2: 'Lalitpur, Nepal'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Shreejan Poudel',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS, MD (Neurology)',
        experience: '4 Years',
        about: 'Dr. Shreejan Poudel is a skilled neurologist who specializes in diagnosing and treating complex neurological disorders. With a focus on early intervention and personalized care, she works to improve the quality of life for her patients by effectively managing conditions such as migraines, epilepsy, and other neurological diseases.',
        fees: 4000,
        address: {
            line1: 'Near Sauraha',
            line2: 'Chitwan, Nepal'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Nisha Adhikari',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS, MD (General Medicine)',
        experience: '4 Years',
        about: 'Dr. Nisha Adhikari is a compassionate general physician committed to providing holistic medical care. She specializes in diagnosing and treating a variety of illnesses and conditions, with a strong focus on preventive healthcare. Dr. Adhikari works closely with her patients to offer personalized treatment plans and guidance for maintaining overall health.',
        fees: 3000,
        address: {
            line1: 'Near Lakeside',
            line2: 'Pokhara, Nepal'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Suraj Gurung',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Obstetrics and Gynecology)',
        experience: '3 Years',
        about: 'Dr. Suraj Gurung is a dedicated gynecologist with a strong focus on women\'s health. She specializes in providing comprehensive care, from routine gynecological check-ups to complex treatments. Dr. Gurung emphasizes preventive care, early diagnosis, and effective treatment strategies to ensure the well-being of women at all stages of life.',
        fees: 3000,
        address: {
            line1: 'Near Boudhanath Stupa',
            line2: 'Kathmandu, Nepal'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Namrata Rai',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '1 Years',
        about: 'Dr. Namrata Rai is a passionate dermatologist dedicated to providing high-quality skin care. She specializes in treating a variety of skin conditions, from common rashes to complex dermatological issues. Dr. Rai focuses on early diagnosis and preventive care to help her patients maintain healthy and beautiful skin.',
        fees: 2500,
        address: {
            line1: 'Near Patan Durbar Square',
            line2: 'Lalitpur, Nepal'
        }
    },
]