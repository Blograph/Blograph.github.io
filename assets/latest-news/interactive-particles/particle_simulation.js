    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        multiply(scalar) {
            return new Vector(this.x * scalar, this.y * scalar);
        }
        add(other) {
            return new Vector(this.x + other.x, this.y + other.y);
        }
        substract(other) {
            return new Vector(this.x - other.x, this.y - other.y);
        }
        norm() {
            return Math.sqrt(this.x ** 2 + this.y ** 2);
        }
    };
    class Particle {
        constructor(position, velocity, radius, color = '#3cb5b3') {
            this.position = position;
            this.velocity = velocity;
            this.radius = radius;
            this.color = color;
            this.acceleration = new Vector(0, 0);
        }
        update(dt) {
            // Update velocity
            this.velocity = this.velocity.add(this.acceleration.multiply(dt));

            // Ensure minimun velocity
            if (this.velocity.norm() < min_speed) {
                this.velocity = this.velocity.multiply(min_speed / this.velocity.norm());
            }
            // Update position
            this.position = this.position.add(this.velocity.multiply(dt));

            // Apply periodic boundaries

            const scaling = 1.4;
            if (this.position.x < 0) this.position.x += scaling * canvas.width;
            if (this.position.x > canvas.width) this.position.x -= scaling * canvas.width;
            if (this.position.y < 0) this.position.y += scaling * canvas.height;
            if (this.position.y > canvas.height) this.position.y -= scaling * canvas.height;
        }
    };

    function draw(particles) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2);

            // Add glowing effect
            ctx.shadowBlur = 5.5; // Adjust the shadow blur to control the glow intensity
            ctx.shadowColor = particle.color;

            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();

            // Reset shadow properties
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';
        });
        if (show_mouse) {
            ctx.beginPath();
            ctx.arc(mouse_particle.position.x, mouse_particle.position.y, mouse_particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = mouse_particle.color;
            ctx.fill();
            ctx.closePath();
        }
    }

    function initializeParticles(numParticles) {
        var particles = [];
        const speed = 50;
        for (let i = 0; i < numParticles; i++) {
            const position = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
            const angle = Math.random() * 2 * Math.PI;
            const velocity = new Vector(Math.cos(angle), Math.sin(angle)).multiply(speed);
            const radius = 1.7;
            particles.push(new Particle(position, velocity, radius));
        }
        return particles;
    }

    function updateMouseParticle(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width; // Scaling factor for the canvas width
        const scaleY = canvas.height / rect.height; // Scaling factor for the canvas height

        // Calculate the mouse position relative to the canvas
        mouse_particle.position.x = (event.clientX - rect.left) * scaleX;
        mouse_particle.position.y = (event.clientY - rect.top) * scaleY;
    }

    canvas.addEventListener('touchmove', handleTouchMove);

    function handleTouchMove(event) {
        event.preventDefault(); // Prevent default behavior (e.g., scrolling)

        // Use the first touch position for simplicity (you can enhance it for multiple touches)
        const touch = event.touches[0];

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // Calculate the touch position relative to the canvas
        mouse_particle.position.x = (touch.clientX - rect.left) * scaleX;
        mouse_particle.position.y = (touch.clientY - rect.top) * scaleY;
    }


    function updateParticles(particles, dt) {
        // Calculate forces
        var r;
        var d;
        for (let i = 0; i < particles.length; i++) {
            // Reset forces
            particles[i].acceleration = new Vector(0, 0);

            // Collision with mouse particle
            r = particles[i].position.substract(mouse_particle.position);
            d = particles[i].radius + mouse_particle.radius - r.norm();
            if (d > 0) {
                particles[i].acceleration = r.multiply(60 * d / r.norm());
            }

            // Viscouse damping
            particles[i].acceleration = particles[i].acceleration.add(particles[i].velocity.multiply(-0.8));

            // Add wind
            particles[i].acceleration = particles[i].acceleration.add(new Vector(3 * Math.random(), -2.5));
        }
        particles.forEach(particle => particle.update(dt));
    }

    function animate() {
        updateParticles(particles, 0.01);
        draw(particles);
        requestAnimationFrame(animate);
    }

    const min_speed = 20;
    const canvas = document.getElementById('particleCanvas');
    canvas.addEventListener('mousemove', updateMouseParticle);
    canvas.height = 150;
    const particles = initializeParticles(350);
    const mouse_particle = new Particle(new Vector(0, 0), new Vector(0, 0), 30, '#b86014');
    const show_mouse = false;
    animate();