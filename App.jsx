import React, { useMemo, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Heart, Leaf,
  Menu, Minus, Plus, Search, ShoppingBag, Star, Truck, X,
} from 'lucide-react';
import './App.css';

const products = [
  { name: 'Fresh Apples', category: 'Fruits', price: 4.9, unit: 'per 4 pack', rating: '4.9', reviews: 124, badge: 'BESTSELLER', image: 'photo-1560806887-1e4cd0b6cbd6' },
  { name: 'Alphonso Mangoes', category: 'Fruits', price: 8.5, unit: 'per 2 pack', rating: '5.0', reviews: 98, badge: 'IN SEASON', seasonal: true, image: 'photo-1553279768-865429fa0078' },
  { name: 'Fresh Strawberries', category: 'Fruits', price: 6.25, unit: 'per 250g', rating: '4.8', reviews: 76, seasonal: true, image: 'photo-1464965911861-746a04b4bca6' },
  { name: 'Green Grapes', category: 'Fruits', price: 5.75, unit: 'per 500g', rating: '4.9', reviews: 63, image: 'photo-1537640538966-79f369143f8f' },
  { name: 'Fresh Bananas', category: 'Fruits', price: 3.2, unit: 'per bunch', rating: '4.7', reviews: 142, organic: true, image: 'photo-1571771894821-ce9b6c11b08e' },
  { name: 'Pomegranates', category: 'Fruits', price: 5.5, unit: 'per 2 pack', rating: '4.9', reviews: 54, image: 'photo-1541344999736-83eca272f6fc' },
  { name: 'Fresh Broccoli', category: 'Vegetables', price: 4.25, unit: 'per 300g', rating: '4.8', reviews: 81, image: 'photo-1459411621453-7b03977f4bfc' },
  { name: 'Organic Spinach', category: 'Vegetables', price: 3.95, unit: 'per 150g', rating: '4.9', reviews: 116, organic: true, image: 'photo-1576045057995-568f588f82fb' },
  { name: 'Fresh Tomatoes', category: 'Vegetables', price: 4.5, unit: 'per 500g', rating: '4.8', reviews: 92, image: 'photo-1546094096-0df4bcaaa337' },
  { name: 'Green Capsicum', category: 'Vegetables', price: 3.75, unit: 'per 3 pack', rating: '4.7', reviews: 69, image: 'photo-1563565375-f3fdfdbefa83' },
  { name: 'Fresh Carrots', category: 'Vegetables', price: 4.1, unit: 'per 500g', rating: '4.8', reviews: 73, image: 'photo-1445282768818-728615cc910a' },
  { name: 'Cucumbers', category: 'Vegetables', price: 2.85, unit: 'per 2 pack', rating: '4.7', reviews: 58, image: 'photo-1604977042946-1eecc30f269e' },
];

const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const categoryCards = [
  { name: 'Fresh Fruits', note: 'Sun-ripened & full of life', count: '24 varieties', category: 'Fruits', image: 'photo-1490474418585-ba9bad8fd0ea' },
  { name: 'Green Vegetables', note: 'Picked at their very best', count: '32 varieties', category: 'Vegetables', image: 'photo-1540420773420-3366772f4999' },
  { name: 'Organic Goodness', note: 'Naturally grown, always', count: '18 essentials', category: 'Organic', image: 'photo-1518843875459-f738682238a6' },
  { name: 'Seasonal Specials', note: 'A little taste of the season', count: 'Limited harvest', category: 'Seasonal', image: 'photo-1464965911861-746a04b4bca6' },
];
const benefits = [
  { icon: Leaf, title: '100% Fresh', copy: 'Picked at peak freshness, never stored for long.' },
  { icon: Check, title: 'Hand-Selected', copy: 'Every piece chosen with care by our produce experts.' },
  { icon: SproutIcon, title: 'Farm to Table', copy: 'Thoughtfully sourced from farms we know and trust.' },
  { icon: Truck, title: 'At Your Door', copy: 'Carefully packed and delivered fresh to your home.' },
  { icon: Heart, title: 'Fairly Priced', copy: 'Beautiful produce and honest prices, always.' },
];

function SproutIcon({ size = 22 }) {
  return <Leaf size={size} strokeWidth={1.6} />;
}

function Logo({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#home" aria-label="Natura home">
    <span className="brand-mark"><Leaf size={20} strokeWidth={1.8} /></span>
    <span>NATURA<span className="brand-period">.</span></span>
  </a>;
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');

  const filteredProducts = useMemo(() => products.filter((product) => {
      const matchesCategory = activeCategory === 'All' ||
        (activeCategory === 'Organic' ? product.organic : activeCategory === 'Seasonal' ? product.seasonal : product.category === activeCategory);
    return matchesCategory && product.name.toLowerCase().includes(search.trim().toLowerCase());
  }), [activeCategory, search]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = products.reduce((sum, product) => sum + (cart[product.name] || 0) * product.price, 0);

  function updateQuantity(name, amount) {
    setCart((current) => {
      const quantity = Math.max(0, (current[name] || 0) + amount);
      const next = { ...current };
      if (quantity) next[name] = quantity;
      else delete next[name];
      return next;
    });
  }
  function filterProducts(category) {
    setActiveCategory(category);
    setMenuOpen(false);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }
  function subscribe(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  }

  const closeMenu = () => setMenuOpen(false);
  const navLinks = [['Home', '#home'], ['Shop', '#products'], ['Fruits', '#products'], ['Vegetables', '#products'], ['Our Story', '#about'], ['Contact', '#contact']];

  return <div className="site-shell">
    <div className="announcement"><span>GOOD THINGS GROW HERE</span><i /> Nature's freshness, delivered to you <i /> <a href="#products">Shop the harvest <ArrowRight size={12} /></a></div>
    <header className="site-header">
      <div className="header-inner">
        <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
        <Logo />
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navLinks.map(([label, href]) => <a key={label} href={href} onClick={(event) => {
            closeMenu();
            if (label === 'Fruits' || label === 'Vegetables') { event.preventDefault(); filterProducts(label); }
          }}>{label}</a>)}
          <a className="nav-mobile-cta" href="#products" onClick={closeMenu}>Shop the harvest <ArrowRight size={15} /></a>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-toggle" aria-label="Search products" onClick={() => {
            setSearchOpen(!searchOpen);
            setTimeout(() => document.getElementById('product-search')?.focus(), 0);
          }}><Search size={20} /></button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}>
            <ShoppingBag size={19} /><span className="cart-label">Bag</span><span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
      {searchOpen && <div className="search-bar">
        <Search size={17} />
        <input id="product-search" value={search} onChange={(event) => { setSearch(event.target.value); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} placeholder="Search fresh produce..." aria-label="Search fresh produce" />
        <button onClick={() => { setSearch(''); setSearchOpen(false); }} aria-label="Close search"><X size={18} /></button>
      </div>}
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span /> THE ART OF EATING WELL</div>
          <h1>Fresh from nature,<br />delivered <em>with love.</em></h1>
          <p>Discover farm-fresh fruits and handpicked vegetables for a healthier, happier table.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#products">Shop the collection <ArrowRight size={16} /></a>
            <a className="text-link hero-text-link" href="#about">Our way of growing <ArrowUpRight size={15} /></a>
          </div>
          <div className="hero-note"><span className="note-line" /> A little closer to nature, every day.</div>
        </div>
        <div className="hero-aside"><span>FRESHLY GATHERED</span><i /> <span>EST. WITH CARE</span></div>
        <a className="hero-scroll" href="#categories" aria-label="Scroll to discover"><span>SCROLL TO DISCOVER</span><ArrowDown size={15} /></a>
      </section>

      <section className="intro-strip">
        <div className="intro-mark"><Leaf size={23} /></div>
        <p>Good food begins with <em>good soil.</em></p>
        <span>We bring a little more nature to your everyday.</span>
      </section>

      <section className="section categories-section" id="categories">
        <div className="section-heading">
          <div><span className="eyebrow">A FRESH PLACE TO START</span><h2>Find your <em>favourite.</em></h2></div>
          <a className="text-link" href="#products">Explore all produce <ArrowRight size={15} /></a>
        </div>
        <div className="category-grid">
          {categoryCards.map((category, index) => <button className={`category-card category-card-${index + 1}`} key={category.name} onClick={() => filterProducts(category.category)}>
            <img src={photo(category.image, 750)} alt={category.name} loading="lazy" />
            <span className="category-shade" />
            <span className="category-copy"><span className="category-count">{category.count}</span><strong>{category.name}</strong><span>{category.note}</span></span>
            <span className="category-arrow"><ArrowUpRight size={18} /></span>
          </button>)}
        </div>
      </section>

      <section className="section products-section" id="products">
        <div className="section-heading products-heading">
          <div><span className="eyebrow">THE GOOD STUFF, GATHERED</span><h2>Fresh picks, <em>just in.</em></h2></div>
          <span className="product-intro">The season's most loved, thoughtfully grown and ready to enjoy.</span>
        </div>
        <div className="product-toolbar">
          <div className="filter-list" role="group" aria-label="Filter products by category">
            {['All', 'Fruits', 'Vegetables', 'Organic', 'Seasonal'].map((category) => <button key={category} className={activeCategory === category ? 'filter-active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <span className="results-count">{filteredProducts.length} thoughtfully picked</span>
        </div>
        {filteredProducts.length ? <div className="product-grid">
          {filteredProducts.map((product) => <article className="product-card" key={product.name}>
            <div className="product-image-wrap">
              <img src={photo(product.image, 680)} alt={product.name} loading="lazy" />
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <button className={`wishlist-button ${wishlist.includes(product.name) ? 'wishlisted' : ''}`} aria-label={`${wishlist.includes(product.name) ? 'Remove' : 'Add'} ${product.name} ${wishlist.includes(product.name) ? 'from' : 'to'} wishlist`} onClick={() => setWishlist((current) => current.includes(product.name) ? current.filter((name) => name !== product.name) : [...current, product.name])}><Heart size={17} fill={wishlist.includes(product.name) ? 'currentColor' : 'none'} /></button>
              <button className="quick-add" onClick={() => updateQuantity(product.name, 1)}>{cart[product.name] ? <><Check size={15} /> Added · {cart[product.name]}</> : <><Plus size={15} /> Add to bag</>}</button>
            </div>
            <div className="product-details">
              <div className="product-title-row"><h3>{product.name}</h3><span className="product-price">${product.price.toFixed(2)}</span></div>
              <div className="product-meta"><span>{product.unit}</span><span className="rating"><Star size={12} fill="currentColor" /> {product.rating} <i>({product.reviews})</i></span></div>
              {cart[product.name] > 0 && <div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(product.name, -1)}><Minus size={13} /></button><span>{cart[product.name]} in your bag</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(product.name, 1)}><Plus size={13} /></button></div>}
            </div>
          </article>)}
        </div> : <div className="empty-products"><Leaf size={25} /><p>No fresh picks found. Try another search.</p><button className="text-link" onClick={() => { setSearch(''); setActiveCategory('All'); }}>View all produce <ArrowRight size={15} /></button></div>}
        <a href="#categories" className="button button-outline all-products-button">Explore the full harvest <ArrowRight size={16} /></a>
      </section>

      <section className="benefits-section">
        <div className="benefits-inner">
          <div className="benefit-heading"><span className="eyebrow">THE NATURA DIFFERENCE</span><h2>A fresher way<br />to <em>feel good.</em></h2><p>We believe what you eat should make you feel good — in every way.</p><a className="text-link" href="#about">A little about us <ArrowRight size={15} /></a></div>
          <div className="benefit-grid">{benefits.map(({ icon: Icon, title, copy }, index) => <div className="benefit-item" key={title}><span className="benefit-icon"><Icon size={20} /></span><span className="benefit-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
        </div>
      </section>

      <section className="promo-section">
        <img src={photo('photo-1540420773420-3366772f4999', 1600)} alt="A table filled with freshly picked vegetables" loading="lazy" />
        <div className="promo-shade" />
        <div className="promo-content"><span className="eyebrow">A GOOD THING, EVERY DAY</span><h2>Eat fresh.<br /><em>Live well.</em></h2><p>A brighter plate starts with something simple.</p><a className="button button-light" href="#products">Shop the harvest <ArrowRight size={16} /></a></div>
        <div className="promo-stamp"><Leaf size={22} /><span>GOODNESS<br />GROWN<br />WITH CARE</span></div>
      </section>

      <section className="about-section section" id="about">
        <div className="about-photo"><img src={photo('photo-1542838132-92c53300491e', 1000)} alt="Fresh produce selected for the Natura market" loading="lazy" /><span className="about-photo-note">THE SIMPLE THINGS, DONE WELL.</span></div>
        <div className="about-copy"><span className="eyebrow">A LITTLE MORE NATURA</span><h2>Rooted in nature.<br /><em>Made for living.</em></h2><p className="about-lead">At NATURA, we believe the best things in life begin with something real.</p><p>That's why we bring together vibrant, seasonal fruits and vegetables from growers who care as much about the land as they do about what it gives. From the first crisp bite to the last ripe tomato, every pick is chosen to bring more colour, goodness and joy to your table.</p><p>Because eating well shouldn't feel like a big thing. It should feel like coming home.</p><a className="text-link" href="#contact">Come say hello <ArrowRight size={15} /></a><div className="about-signoff">With care, <span>The NATURA family</span></div></div>
      </section>

      <section className="reviews-section">
        <div className="section reviews-inner">
          <div className="section-heading reviews-heading"><div><span className="eyebrow">KIND WORDS, FRESHLY SHARED</span><h2>Goodness worth <em>sharing.</em></h2></div><div className="review-summary"><span className="rating-stars">★★★★★</span><span>LOVED BY OUR COMMUNITY</span></div></div>
          <div className="review-grid">
            {[
              ['“The strawberries actually taste like strawberries. Everything arrives so fresh and beautifully packed.”', 'Amelia R.', 'A happier weekly shop'],
              ['“I love knowing where our food comes from. NATURA makes eating well feel effortless.”', 'Daniel K.', 'A little more goodness'],
              ['“The seasonal selection is such a treat. The mangoes were perfectly ripe — absolute sunshine.”', 'Priya S.', 'A taste of the season'],
            ].map(([quote, name, note]) => <article className="review-card" key={name}><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span><blockquote>{quote}</blockquote><div className="review-author"><span className="review-avatar">{name.charAt(0)}</span><span><strong>{name}</strong><small>{note}</small></span><Check className="verified-mark" size={16} /></div></article>)}
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-leaf"><Leaf size={28} /></div>
        <div className="newsletter-copy"><span className="eyebrow">A FRESH NOTE FROM US</span><h2>A little goodness in your inbox.</h2><p>Seasonal favourites, fresh inspiration and the occasional little treat.</p></div>
        <form className="newsletter-form" onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="Subscribe to newsletter">{subscribed ? <><Check size={16} /> You're on the list</> : <>Sign me up <ArrowRight size={16} /></>}</button><small>{subscribed ? 'Thank you for joining our table.' : 'Just the good stuff. Unsubscribe any time.'}</small></form>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-image"><img src={photo('photo-1542838132-92c53300491e', 950)} alt="A basket of fresh fruit and vegetables" loading="lazy" /></div>
        <div className="contact-content"><span className="eyebrow">LET'S TALK GOOD FOOD</span><h2>We're here to<br /><em>help you feel good.</em></h2><p>Discover fresh seasonal produce, thoughtfully selected to bring more goodness to your table.</p><div className="contact-details"><div><span>BUSINESS</span><strong>NATURA</strong></div><div><span>WHAT WE DO</span><strong>Premium fruits & vegetables</strong></div></div><div className="contact-actions"><a className="button button-dark" href="#products">Explore the harvest <ArrowRight size={16} /></a><span className="contact-note">Phone, WhatsApp and email details have not been provided.</span></div></div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Logo light /><p>Nature's freshness,<br />delivered to you.</p><div className="social-links"><a href="#contact" aria-label="Instagram">ig</a><a href="#contact" aria-label="Pinterest">p</a><a href="#contact" aria-label="Facebook">f</a></div></div>
        <div className="footer-column"><span>EXPLORE</span><a href="#home">Home</a><a href="#products">Shop all</a><a href="#about">Our story</a><a href="#contact">Contact us</a></div>
        <div className="footer-column"><span>THE HARVEST</span><a href="#products" onClick={() => setActiveCategory('Fruits')}>Fresh fruits</a><a href="#products" onClick={() => setActiveCategory('Vegetables')}>Green vegetables</a><a href="#categories">Organic goodness</a><a href="#categories">Seasonal specials</a></div>
        <div className="footer-note"><span className="eyebrow">A NOTE FROM THE GARDEN</span><p>Good things take time.<br />Good food brings us together.</p><a href="#contact" className="footer-more">Business details <ArrowRight size={14} /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} NATURA. GROWN WITH CARE.</span><span>Nature's freshness, delivered to you.</span><a href="#home">Back to top <ChevronDown size={14} /></a></div>
    </footer>

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Shopping bag">
        <div className="drawer-header"><div><span className="eyebrow">YOUR FRESH PICKS</span><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
        {cartCount ? <><div className="cart-items">{products.filter((product) => cart[product.name]).map((product) => <div className="cart-item" key={product.name}><img src={photo(product.image, 180)} alt="" /><div className="cart-item-info"><strong>{product.name}</strong><small>{product.unit}</small><span>${(product.price * cart[product.name]).toFixed(2)}</span><div className="quantity-control"><button onClick={() => updateQuantity(product.name, -1)} aria-label={`Remove one ${product.name}`}><Minus size={12} /></button><span>{cart[product.name]}</span><button onClick={() => updateQuantity(product.name, 1)} aria-label={`Add one ${product.name}`}><Plus size={12} /></button></div></div></div>)}</div><div className="drawer-footer"><div className="cart-subtotal"><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div><small>Delivery calculated at checkout.</small><button className="button button-dark checkout-button" onClick={() => setNotice('Your bag is ready. Contact us to arrange your fresh delivery.')}>Continue to checkout <ArrowRight size={16} /></button>{notice && <small className="checkout-note">{notice}</small>}</div></> : <div className="empty-cart"><ShoppingBag size={30} /><h3>Your bag is taking a breather.</h3><p>Fill it with something fresh and lovely.</p><button className="button button-dark" onClick={() => { setCartOpen(false); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore the harvest <ArrowRight size={15} /></button></div>}
      </aside>
    </div>}
  </div>;
}

export default App;
