document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const config = {
        maxNodes: 400,
        maxNodeConnectionDistance: 80,
        maxNodeConnections: 5,
        nodeConnectionOpacity: 0.08,
        minNodeSize: 1,
        maxNodeSize: 3,
        wanderRadius: 20,
        wanderDistance: 500,
        wanderChange: 0.7
    };

    const nodes = [];
    const colors = [
        'rgba(99, 102, 241, 1)', 
        'rgba(6, 182, 212, 1)'   
    ];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Node {
        constructor(x, y) {
            this.pos = glMatrix.vec2.fromValues(x, y);
            this.vel = glMatrix.vec2.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1);
            glMatrix.vec2.normalize(this.vel, this.vel);
            
            const speed = Math.random() * 0.5 + 0.1;
            glMatrix.vec2.scale(this.vel, this.vel, speed);

            this.size = Math.random() * (config.maxNodeSize - config.minNodeSize) + config.minNodeSize;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            this.wanderAngle = Math.random() * Math.PI * 2;
        }

        update() {
            this.wanderAngle += (Math.random() * 2 - 1) * config.wanderChange;
            
            const wanderForce = glMatrix.vec2.fromValues(
                Math.cos(this.wanderAngle) * config.wanderRadius,
                Math.sin(this.wanderAngle) * config.wanderRadius
            );
            
            const distanceOffset = glMatrix.vec2.create();
            glMatrix.vec2.copy(distanceOffset, this.vel);
            glMatrix.vec2.normalize(distanceOffset, distanceOffset);
            glMatrix.vec2.scale(distanceOffset, distanceOffset, config.wanderDistance);
            
            glMatrix.vec2.add(wanderForce, wanderForce, distanceOffset);
            glMatrix.vec2.scale(wanderForce, wanderForce, 0.001); 
            
            glMatrix.vec2.add(this.vel, this.vel, wanderForce);
            
            if (glMatrix.vec2.length(this.vel) > 1) {
                glMatrix.vec2.normalize(this.vel, this.vel);
            }

            glMatrix.vec2.add(this.pos, this.pos, this.vel);

            if (this.pos[0] < 0) this.pos[0] = width;
            if (this.pos[0] > width) this.pos[0] = 0;
            if (this.pos[1] < 0) this.pos[1] = height;
            if (this.pos[1] > height) this.pos[1] = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < config.maxNodes; i++) {
        nodes.push(new Node(Math.random() * width, Math.random() * height));
    }

    function render() {
        ctx.fillStyle = 'rgba(245, 245, 240, 0.15)';
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < nodes.length; i++) {
            nodes[i].update();
        }

        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            let connections = 0;
            const nodeA = nodes[i];
            
            for (let j = i + 1; j < nodes.length; j++) {
                if (connections >= config.maxNodeConnections) break;
                
                const nodeB = nodes[j];
                const dx = nodeA.pos[0] - nodeB.pos[0];
                const dy = nodeA.pos[1] - nodeB.pos[1];
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.maxNodeConnectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(nodeA.pos[0], nodeA.pos[1]);
                    ctx.lineTo(nodeB.pos[0], nodeB.pos[1]);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${config.nodeConnectionOpacity})`;
                    ctx.stroke();
                    connections++;
                }
            }
        }

        for (let i = 0; i < nodes.length; i++) {
            nodes[i].draw();
        }

        requestAnimationFrame(render);
    }

    render();
});
