import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const tourStops = [
  { id: 1, name: 'Мармарис', description: 'Старт путешествия, встреча группы', x: 20, y: 50 },
  { id: 2, name: 'Султание', description: 'Термальные источники и грязевые ванны', x: 50, y: 30 },
  { id: 3, name: 'Мармарис', description: 'Возвращение, прогулка по набережной', x: 80, y: 50 },
];

const tourDays = [
  { day: 1, title: 'Заезд в Мармарис', description: 'Размещение в отеле, знакомство с группой' },
  { day: 2, title: 'Обзорная экскурсия', description: 'Завтрак в отеле, прогулка по Мармарису, ужин на берегу моря, женский круг: определение запросов на ретрит' },
  { day: 3, title: 'Султание', description: 'Завтрак, переезд в Султание, размещение, термальные бассейны, ужин, женский круг: практика очищения свечами' },
  { day: 4, title: 'Термальные источники', description: 'Завтрак, термальные бассейны, свободное время, ужин, нейрографика' },
  { day: 5, title: 'Релакс и практики', description: 'Завтрак, термальные бассейны, свободное время, ужин, женский круг: время и энергия' },
  { day: 6, title: 'День в Султание', description: 'Завтрак, термальные бассейны, свободное время, ужин, женский круг' },
  { day: 7, title: 'Оздоровление', description: 'Завтрак, термальные бассейны, свободное время, ужин, женский круг' },
  { day: 8, title: 'Возвращение в Мармарис', description: 'Выезд из Султание, турецкий завтрак в Акьяка, морская прогулка, экскурсия, возвращение в Мармарис, ужин' },
  { day: 9, title: 'Фотосессия и отдых', description: 'Завтрак в отеле, фотосессия, свободное время, праздничный ужин-сюрприз' },
  { day: 10, title: 'Шопинг и прогулки', description: 'Завтрак в отеле, свободный день, прогулка по городу, шопинг, ужин в Локанте' },
  { day: 11, title: 'Разъезд', description: 'Завтрак в отеле, свободное время, трансфер в аэропорт' },
];

const gallery = [
  { id: 1, url: 'https://cdn.poehali.dev/files/e796966e-f7c9-473c-9a24-51e34a0781a6.jpeg', alt: 'Отдых на берегу моря' },
  { id: 2, url: 'https://cdn.poehali.dev/files/361e42e3-25a1-4c26-a323-5a91aa30f3d0.jpeg', alt: 'Бассейн с видом на озеро' },
  { id: 3, url: 'https://cdn.poehali.dev/files/9c72d9aa-a89f-4b75-9b3a-984b22f99524.jpeg', alt: 'Отдых на море' },
  { id: 4, url: 'https://cdn.poehali.dev/files/ee5deb92-c740-42d6-afe8-a7681b8c9355.jpeg', alt: 'Участницы в СПА' },
  { id: 5, url: 'https://cdn.poehali.dev/files/d9db32e0-cdae-486b-8e17-ceddb631a6e7.jpeg', alt: 'Качели на воде' },
  { id: 6, url: 'https://cdn.poehali.dev/files/0c9e3aff-758a-4954-ae3c-1c3aa0f963e7.jpeg', alt: 'Йога на берегу моря' },
  { id: 7, url: 'https://cdn.poehali.dev/projects/b49f11c6-af3b-4cdb-8a7f-b8b1b83ee9ac/files/0d0dfd45-b30b-4546-b662-17ab810a87a7.jpg', alt: 'Турецкий пейзаж' },
  { id: 8, url: 'https://cdn.poehali.dev/projects/b49f11c6-af3b-4cdb-8a7f-b8b1b83ee9ac/files/056d94f3-f908-4713-bbec-14305d1ae6d3.jpg', alt: 'Базар' },
  { id: 9, url: 'https://cdn.poehali.dev/projects/b49f11c6-af3b-4cdb-8a7f-b8b1b83ee9ac/files/29130b54-d92d-4aaa-a6e8-506b9d0ef0bf.jpg', alt: 'Участницы тура' },
  { id: 10, url: 'https://cdn.poehali.dev/files/b903130e-e8fa-47be-8056-8beb99f77dd3.jpeg', alt: 'Отдых на берегу с видом на море' },
  { id: 11, url: 'https://cdn.poehali.dev/files/18aa253c-fbe7-420b-b114-973ba13485dd.jpeg', alt: 'Лодки на озере' },
  { id: 12, url: 'https://cdn.poehali.dev/files/1521b813-a9cf-417c-ab70-c88494fa8093.jpeg', alt: 'Уютный отель с цветами' },
  { id: 13, url: 'https://cdn.poehali.dev/files/cf064487-117c-48bf-a487-8cd742aee7df.jpeg', alt: 'Птицы на озере' },
  { id: 14, url: 'https://cdn.poehali.dev/files/f1c36981-abc6-4404-82e5-eb23dc0c6761.jpeg', alt: 'Участница тура' },
];

const testimonials = [
  { name: 'Варвара', text: 'Я получила гораздо больше чем ожидала, я вернулась другой, и каждый день в моей голове и в сердце что-то происходит, что-то бесповоротно меняется. Для меня жизнь разделилась на до и после поездки. Волшебство.', avatar: '👩' },
  { name: 'Евгения', text: 'Благодарю за этот тур!!! Никогда не жила в таких шикарных условиях, осталась в полном восторге. Это было именно то, что мне нужно. Осталась довольна абсолютно всем!!!', avatar: '👩‍🦰' },
  { name: 'Анна', text: 'Этот остров поможет вам заглянуть во внутрь себя и взглянуть на себя со стороны. Огромное спасибо за индивидуальный подход, за уделенное внимание каждой участнице, за поддержку на пути в НОВУЮ жизнь!', avatar: '👱‍♀️' },
];

const faqs = [
  { question: 'Какой уровень физподготовки нужен?', answer: 'Тур рассчитан на комфортный темп, подойдет всем. Прогулки легкие, с остановками.' },
  { question: 'Виза в Турцию нужна?', answer: 'Нет, для граждан РФ виза не требуется при въезде на срок до 60 дней.' },
  { question: 'Можно ли одной в номере?', answer: 'Да, доступно размещение в одноместном номере с доплатой.' },
  { question: 'Что входит в стоимость?', answer: 'Все перелеты внутри Турции, проживание, завтраки, экскурсии по программе, трансферы.' },
];

export default function Index() {
  const [activeStop, setActiveStop] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${gallery[0].url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Турция для души</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Авторский женский тур в сердце Турции
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-terracotta hover:bg-terracotta/90"
            onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Забронировать место
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Программа по дням</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {tourDays.map((day) => (
              <AccordionItem key={day.day} value={`day-${day.day}`} className="border rounded-2xl px-6 bg-white shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-terracotta text-white flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                    <span className="font-semibold text-lg">{day.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-16 text-muted-foreground">
                  {day.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 px-4 bg-warmGray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">Маршрут тура</h2>
          
          <div className="relative bg-white rounded-3xl p-8 shadow-lg">
            <div className="relative h-96 bg-gradient-to-br from-turquoise/20 to-terracotta/20 rounded-2xl overflow-hidden">
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d={`M ${tourStops.map((stop, i) => 
                    `${i === 0 ? 'M' : 'L'} ${stop.x}% ${stop.y}%`
                  ).join(' ')}`}
                  stroke="#F97316"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="10,5"
                />
              </svg>
              
              {tourStops.map((stop) => (
                <div
                  key={stop.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                  onMouseEnter={() => setActiveStop(stop.id)}
                  onMouseLeave={() => setActiveStop(null)}
                >
                  <div className={`w-4 h-4 bg-terracotta rounded-full transition-all duration-300 ${
                    activeStop === stop.id ? 'scale-150' : 'scale-100'
                  }`} />
                  
                  {activeStop === stop.id && (
                    <Card className="absolute top-6 left-1/2 transform -translate-x-1/2 w-64 animate-scale-in z-10">
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{stop.name}</h3>
                        <p className="text-sm text-muted-foreground">{stop.description}</p>
                      </CardContent>
                    </Card>
                  )}
                  
                  <span className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-semibold text-sm">
                    {stop.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-warmGray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Фотогалерея</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((photo, index) => (
              <div 
                key={photo.id} 
                className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Icon name="Maximize2" className="text-white" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Организаторы тура</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center gap-6 bg-white rounded-3xl p-8 shadow-lg">
              <img 
                src="https://cdn.poehali.dev/files/ede616b4-9ae2-4404-b764-02f1e28561e1.jpeg" 
                alt="Бушуева Наталья" 
                className="w-48 h-48 rounded-full object-cover shadow-md"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Бушуева Наталья</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Организатор туров по всему миру. Автор и ведущая женских программ и тренингов. 
                  Организатор фестивалей, нетворкингов, бизнес-завтраков. Основатель Центра женского 
                  развития "NOVA" и школы для девочек подростков «Академия юной леди».
                </p>
                <a 
                  href="https://vk.com/natalia.edem" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-terracotta hover:text-turquoise transition-colors font-semibold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.39 12.88h-1.34c-.53 0-.69-.43-1.64-1.38-.83-.82-1.2-.93-1.41-.93-.29 0-.37.08-.37.47v1.26c0 .34-.11.54-1 .54-1.48 0-3.12-.89-4.27-2.55-1.73-2.45-2.2-4.29-2.2-4.66 0-.21.08-.4.47-.4h1.34c.35 0 .48.16.62.53.73 2.13 1.95 4 2.45 4 .19 0 .27-.09.27-.57V9.46c-.06-.98-.57-1.06-.57-1.41 0-.17.14-.34.37-.34h2.11c.3 0 .4.16.4.5v2.98c0 .3.13.4.21.4.19 0 .34-.1.69-.45 1.06-1.19 1.82-3.03 1.82-3.03.1-.21.27-.4.62-.4h1.34c.4 0 .49.21.4.5-.16.73-1.84 3.44-1.84 3.44-.16.26-.22.38 0 .68.17.22.72.7 1.09 1.13.67.74 1.19 1.36 1.33 1.79.13.43-.08.65-.51.65z"/>
                  </svg>
                  ВКонтакте
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 bg-white rounded-3xl p-8 shadow-lg">
              <img 
                src="https://cdn.poehali.dev/files/2b04a236-c777-4d89-b63c-ff2b68b52e35.jpeg" 
                alt="Светлана Якут" 
                className="w-48 h-48 rounded-full object-cover shadow-md"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Светлана Якут</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Психолог, мастер нейрографики, ведущая женских кругов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-warmGray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Фото с прошлых туров</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/projects/b49f11c6-af3b-4cdb-8a7f-b8b1b83ee9ac/files/7194c558-5013-4591-ad6c-651a97f14a5e.jpg" 
                alt="Групповое фото участниц"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold text-lg">Наша дружная группа</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/projects/b49f11c6-af3b-4cdb-8a7f-b8b1b83ee9ac/files/cad972fe-3cfd-4377-bd5f-4d2e0e82c68f.jpg" 
                alt="Термальные источники"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold text-lg">Релакс в термальных источниках</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/projects/b49f11c6-af3b-4cdb-8a7f-b8b1b83ee9ac/files/268a4435-d1d6-4889-a661-1e0968dfea9e.jpg" 
                alt="Йога на пляже"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold text-lg">Практики на закате</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/projects/b49f11c6-af3b-4cdb-8a7f-b8b1b83ee9ac/files/8039c03c-d23b-4921-bf64-b1bff6650d27.jpg" 
                alt="Праздничный ужин"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold text-lg">Праздничный ужин</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/projects/b49f11c6-af3b-4cdb-8a7f-b8b1b83ee9ac/files/3c3cf54a-8f23-4955-a798-c4bf0a4eb936.jpg" 
                alt="Экскурсия по Мармарису"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold text-lg">Экскурсия по Мармарису</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group cursor-pointer bg-gradient-to-br from-terracotta/20 to-turquoise/20 flex items-center justify-center">
              <div className="text-center p-6">
                <Icon name="Camera" size={48} className="mx-auto mb-4 text-terracotta" />
                <p className="text-lg font-semibold text-foreground">И много других<br />незабываемых моментов!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-accent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Отзывы участниц</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{testimonial.avatar}</div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Стоимость тура</h2>
          
          <Card className="bg-gradient-to-br from-terracotta to-turquoise text-white border-none shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="text-6xl font-bold mb-4">1270 $</div>
              <p className="text-xl mb-8 opacity-90">11 дней / 10 ночей</p>
              
              <div className="space-y-3 text-left max-w-2xl mx-auto mb-8">
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Проживание в отеле</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Завтраки и ужины</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Трансфер</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Обзорная экскурсия по Мармарису, посещение пещеры Нимара</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Турецкий завтрак</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Термальные источники</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Красивые рассветы и закаты на озере Köycegiz</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Овощные и фруктовые фреши по утрам</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Совместно приготовим турецкое блюдо</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Очищение восковыми свечами</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Нейрографика</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Решение одного личного запроса через сессию БоГобан</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Женские круги и практики</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Экскурсия в Акьяку</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Фотосессия в городе Мармарис на берегу моря</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Празднование 8 марта в городе Мармарис</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="flex-shrink-0 mt-1" />
                  <span>Свободное время для шоппинга, прогулок</span>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-white text-terracotta hover:bg-white/90 text-lg px-8 py-6"
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Забронировать
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-warmGray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Частые вопросы</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border rounded-2xl px-6 bg-white shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6 text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-terracotta/5 to-turquoise/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Что входит в стоимость</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'Bed', text: 'Проживание в двухместном или трехместном номере' },
              { icon: 'UtensilsCrossed', text: 'Питание: завтрак-ужин + свежевыжатые соки и фреши на горячих источниках' },
              { icon: 'Bus', text: 'Трансфер' },
              { icon: 'MapPin', text: 'Обзорная экскурсия по Мармарису' },
              { icon: 'Compass', text: 'Обзорная экскурсия в Акьяку' },
              { icon: 'Heart', text: 'Женские практики' },
              { icon: 'Waves', text: 'Посещение горячих источников' },
              { icon: 'Camera', text: 'Фотосессия' },
              { icon: 'Gift', text: 'Праздничный ужин 8 марта + подарок-сюрприз!' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-terracotta/10 p-3 rounded-full flex-shrink-0">
                  <Icon name={item.icon as any} className="text-terracotta" size={24} />
                </div>
                <p className="text-lg leading-relaxed pt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking-form" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Забронировать место</h2>
          <p className="text-center text-muted-foreground mb-12">
            Оставьте заявку, и мы свяжемся с вами в течение 24 часов
          </p>
          
          <form 
            className="space-y-6 bg-white rounded-3xl p-8 shadow-lg"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              setSubmitStatus(null);
              
              try {
                const response = await fetch('https://functions.poehali.dev/cf4e52cb-e443-4acd-89ca-b690b26ae02c', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok && data.success) {
                  setSubmitStatus({ type: 'success', message: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.' });
                  setFormData({ name: '', phone: '', email: '', message: '' });
                } else {
                  setSubmitStatus({ type: 'error', message: 'Ошибка отправки. Попробуйте еще раз.' });
                }
              } catch (error) {
                setSubmitStatus({ type: 'error', message: 'Ошибка соединения. Проверьте интернет.' });
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <div>
              <Input 
                placeholder="Ваше имя *" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="h-12"
                required
              />
            </div>
            <div>
              <Input 
                placeholder="Телефон *" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="h-12"
                required
              />
            </div>
            <div>
              <Input 
                type="email"
                placeholder="Email *" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="h-12"
                required
              />
            </div>

            <div>
              <Textarea 
                placeholder="Комментарий или вопросы" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="min-h-32"
              />
            </div>
            
            {submitStatus && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-800'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-12 text-lg" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              <Icon name="Send" className="ml-2" size={20} />
            </Button>
          </form>
        </div>
      </section>

      <a
        href="https://wa.me/79615631115"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 group"
        aria-label="Написать в WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden group-hover:inline-block font-semibold whitespace-nowrap">
          Написать в WhatsApp
        </span>
      </a>

      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-terracotta transition-colors">
              <Icon name="Instagram" size={32} />
            </a>
            <a href="#" className="hover:text-terracotta transition-colors">
              <Icon name="Phone" size={32} />
            </a>
            <a href="#" className="hover:text-terracotta transition-colors">
              <Icon name="Mail" size={32} />
            </a>
          </div>
          <p className="text-sm opacity-70">© 2024 Турция для души. Все права защищены.</p>
        </div>
      </footer>

      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            <Icon name="X" size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(prev => prev! > 0 ? prev! - 1 : gallery.length - 1);
            }}
          >
            <Icon name="ChevronLeft" size={48} />
          </button>

          <div className="max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={gallery[lightboxIndex].url} 
              alt={gallery[lightboxIndex].alt}
              className="w-full h-full object-contain"
            />
            <p className="text-white text-center mt-4 text-lg">
              {gallery[lightboxIndex].alt}
            </p>
            <p className="text-gray-400 text-center mt-2">
              {lightboxIndex + 1} / {gallery.length}
            </p>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(prev => prev! < gallery.length - 1 ? prev! + 1 : 0);
            }}
          >
            <Icon name="ChevronRight" size={48} />
          </button>
        </div>
      )}
    </div>
  );
}