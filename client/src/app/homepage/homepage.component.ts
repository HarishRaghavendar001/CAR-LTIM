
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements AfterViewInit, OnDestroy ,OnInit{
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  // Poster fallback if video can't load
  poster = 'assets/car-poster.jpg';
 
  private intersectionObserver?: IntersectionObserver;
 constructor(private router:Router){}
  ngAfterViewInit(): void {
    // Use IntersectionObserver so video only plays when visible (saves resources)
    if ('IntersectionObserver' in window && this.bgVideo?.nativeElement) {
      this.intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.bgVideo.nativeElement.play().catch(() => {/* autoplay may be blocked */});
          } else {
            this.bgVideo.nativeElement.pause();
          }
        });
      }, { threshold: 0.25 });
 
      this.intersectionObserver.observe(this.bgVideo.nativeElement);
    } else {
      // fallback: try to play immediately
      this.bgVideo?.nativeElement?.play().catch(()=>{});
    }
  }
 
  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }
 
  // Example click handler for the primary CTA
  onBookClick(): void {
    // Replace with real navigation or open modal
    console.log('Book A Rental clicked');
    // e.g. this.router.navigate(['/booking']);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }


 ngOnInit(): void {
    // AOS.init({ duration: 800, once: true });
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // fallback: top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  onContact(e: Event) {
    e.preventDefault();
    // handle contact form submission (call API or show toast)
    alert('Thanks! message submitted (wire up actual backend in TS).');
  }
  
  
  
}
