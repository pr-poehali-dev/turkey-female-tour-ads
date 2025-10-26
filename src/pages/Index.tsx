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
];

const testimonials = [
  { name: 'Анна', text: 'Невероятное путешествие! Организация на высшем уровне, каждая деталь продумана', avatar: '👩' },
  { name: 'Мария', text: 'Полет на воздушном шаре над Каппадокией - это просто магия! Спасибо за незабываемые эмоции', avatar: '👩‍🦰' },
  { name: 'Елена', text: 'Познакомилась с удивительными женщинами, привезла массу впечатлений и новых подруг', avatar: '👱‍♀️' },
];

const faqs = [
  { question: 'Какой уровень физподготовки нужен?', answer: 'Тур рассчитан на комфортный темп, подойдет всем. Прогулки легкие, с остановками.' },
  { question: 'Виза в Турцию нужна?', answer: 'Нет, для граждан РФ виза не требуется при въезде на срок до 60 дней.' },
  { question: 'Можно ли одной в номере?', answer: 'Да, доступно размещение в одноместном номере с доплатой.' },
  { question: 'Что входит в стоимость?', answer: 'Все перелеты внутри Турции, проживание, завтраки, экскурсии по программе, трансферы.' },
];

export default function Index() {
  const [activeStop, setActiveStop] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

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
          <Button size="lg" className="text-lg px-8 py-6 bg-terracotta hover:bg-terracotta/90">
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
            {gallery.map((photo) => (
              <div 
                key={photo.id} 
                className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
              >
                <img 
                  src={photo.url} 
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Об авторе тура</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-3xl p-8 shadow-lg">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-terracotta to-turquoise flex items-center justify-center text-6xl">
              👩‍✈️
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Екатерина Травелова</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Профессиональный гид с 10-летним стажем. Влюблена в Турцию и знаю эту страну как свои пять пальцев. 
                Организовала более 50 женских туров, каждый из которых становится незабываемым приключением для участниц.
              </p>
              <div className="flex gap-2 items-center text-terracotta font-semibold">
                <Icon name="Heart" size={20} />
                <span>50+ довольных участниц</span>
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
              
              <Button size="lg" className="bg-white text-terracotta hover:bg-white/90 text-lg px-8 py-6">
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

      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Остались вопросы?</h2>
          <p className="text-center text-muted-foreground mb-12">
            Напишите нам, и мы свяжемся с вами в течение 24 часов
          </p>
          
          <form className="space-y-6 bg-white rounded-3xl p-8 shadow-lg">
            <div>
              <Input 
                placeholder="Ваше имя" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="h-12"
              />
            </div>
            <div>
              <Input 
                placeholder="Телефон" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="h-12"
              />
            </div>
            <div>
              <Textarea 
                placeholder="Ваш вопрос" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="min-h-32"
              />
            </div>
            <Button className="w-full h-12 text-lg" size="lg">
              Отправить
              <Icon name="Send" className="ml-2" size={20} />
            </Button>
          </form>
        </div>
      </section>

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
    </div>
  );
}