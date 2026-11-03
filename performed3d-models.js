/**
 * External 3D Avatar Models for Performed 3D (Three.js)
 * Provides the 5 selectable 3D avatars and their procedural textures/materials:
 *  - Crimson Dragon ('dragon')
 *  - Fuchur / Falkor from Die unendliche Geschichte ('fuchur')
 *  - Boy with Bicycle & E.T. ('et_bike')
 *  - Car from Back to the Future ('delorean')
 *  - UFO from Mars Attacks! ('mars_ufo')
 */
window.Performed3DAvatarModels = {
    /**
     * Generates a high-detail seamless procedural texture of overlapping diamond/hexagonal
     * reptilian dragon scales with 3D convex shading, central scale keels, deep inter-scale
     * dermal crevices, and micro-pebbled keratin pores (used as both diffuse map and bumpMap).
     */
    createDragonScalesTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Deep crimson-charcoal dermal base between overlapping scales
        ctx.fillStyle = '#3b0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cols = 16;
        const rows = 20;
        const cellW = canvas.width / cols;
        const cellH = canvas.height / rows;

        for (let row = -1; row <= rows + 1; row++) {
            const y = row * cellH;
            const xOffset = (row % 2 !== 0) ? cellW * 0.5 : 0;

            for (let col = -1; col <= cols + 1; col++) {
                const cx = col * cellW + xOffset;
                const cy = y;
                const seed = Math.abs(Math.sin(row * 37.3 + col * 91.7));
                const rx = cellW * (0.54 + (seed - 0.5) * 0.05);
                const ry = cellH * (0.68 + (seed - 0.5) * 0.06);

                // Scale shadow & overlapping rim
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(cx, cy - ry * 0.92);
                ctx.quadraticCurveTo(cx + rx * 1.05, cy - ry * 0.15, cx + rx * 0.86, cy + ry * 0.35);
                ctx.quadraticCurveTo(cx, cy + ry * 1.12, cx - rx * 0.86, cy + ry * 0.35);
                ctx.quadraticCurveTo(cx - rx * 1.05, cy - ry * 0.15, cx, cy - ry * 0.92);
                ctx.closePath();

                const grad = ctx.createRadialGradient(
                    cx - rx * 0.14,
                    cy - ry * 0.18,
                    rx * 0.08,
                    cx,
                    cy + ry * 0.1,
                    ry * 1.05
                );
                const highlightBoost = Math.round(235 + seed * 20);
                const midTone = Math.round(178 + seed * 28);
                const edgeDark = Math.round(58 + seed * 22);
                grad.addColorStop(0.0, `rgb(${highlightBoost}, ${ Math.round(highlightBoost * 0.86) }, ${ Math.round(highlightBoost * 0.82) })`);
                grad.addColorStop(0.52, `rgb(${midTone}, ${ Math.round(midTone * 0.72) }, ${ Math.round(midTone * 0.68) })`);
                grad.addColorStop(0.86, `rgb(${edgeDark + 38}, ${ Math.round(edgeDark * 0.55) }, ${ Math.round(edgeDark * 0.52) })`);
                grad.addColorStop(1.0, 'rgb(28, 6, 6)');

                ctx.fillStyle = grad;
                ctx.fill();

                ctx.lineWidth = 2.0;
                ctx.strokeStyle = 'rgba(20, 4, 4, 0.88)';
                ctx.stroke();

                // Raised central longitudinal dragon-scale keel ridge
                ctx.beginPath();
                ctx.moveTo(cx, cy - ry * 0.68);
                ctx.lineTo(cx, cy + ry * 0.78);
                ctx.strokeStyle = 'rgba(255, 238, 230, 0.38)';
                ctx.lineWidth = 1.8;
                ctx.stroke();

                // Specular tip glint on the overlapping apex of each scale
                ctx.beginPath();
                ctx.arc(cx, cy + ry * 0.52, rx * 0.22, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 245, 238, 0.22)';
                ctx.fill();
                ctx.restore();
            }
        }

        // Fine reptilian micro-pores & keratin grain across scales
        for (let i = 0; i < 2200; i++) {
            const px = (Math.sin(i * 127.1 + 13.7) * 0.5 + 0.5) * canvas.width;
            const py = (Math.cos(i * 269.5 + 41.3) * 0.5 + 0.5) * canvas.height;
            ctx.fillStyle = (i % 3 === 0) ? 'rgba(255, 241, 242, 0.14)' : 'rgba(24, 4, 4, 0.18)';
            ctx.fillRect(px, py, 1.5, 1.5);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 3);
        return texture;
    },

    /**
     * Generates a procedural texture of overlapping chitinous/keratin ventral belly scute plates
     * with bevelled edges, growth striations, and weathered golden-bronze highlights.
     */
    createDragonScuteArmorTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#451a03';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const plateCount = 6;
        const plateH = canvas.height / plateCount;

        for (let p = 0; p < plateCount; p++) {
            const y0 = p * plateH;
            const grad = ctx.createLinearGradient(0, y0, 0, y0 + plateH);
            grad.addColorStop(0.0, '#78350f');
            grad.addColorStop(0.18, '#f59e0b');
            grad.addColorStop(0.55, '#fbbf24');
            grad.addColorStop(0.84, '#b45309');
            grad.addColorStop(1.0, '#290f02');
            ctx.fillStyle = grad;
            ctx.fillRect(0, y0 + 2, canvas.width, plateH - 3);

            // Chevron-like overlap bevel highlight along plate edge
            ctx.strokeStyle = 'rgba(254, 243, 199, 0.55)';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(0, y0 + plateH * 0.25);
            ctx.quadraticCurveTo(canvas.width * 0.5, y0 + plateH * 0.42, canvas.width, y0 + plateH * 0.25);
            ctx.stroke();

            // Longitudinal keratin growth striations across the scute plate
            for (let sx = 4; sx < canvas.width; sx += 6) {
                const wave = Math.sin(sx * 0.12 + p) * 2.0;
                ctx.strokeStyle = (sx % 12 === 0)
                    ? 'rgba(69, 26, 3, 0.34)'
                    : 'rgba(254, 249, 195, 0.22)';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(sx, y0 + 3);
                ctx.lineTo(sx + wave, y0 + plateH - 4);
                ctx.stroke();
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 2);
        return texture;
    },

    /**
     * Generates a procedural leathery patagium wing membrane texture featuring branching
     * arterial blood vessels, fine capillaries, tensioned elastic skin folds, and dermal pores.
     */
    createDragonWingMembraneTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Rich translucent leathery membrane gradient from muscular leading edge to trailing web
        const bgGrad = ctx.createRadialGradient(80, 90, 20, 256, 256, 420);
        bgGrad.addColorStop(0.0, '#fca5a5');
        bgGrad.addColorStop(0.45, '#ef4444');
        bgGrad.addColorStop(0.82, '#b91c1c');
        bgGrad.addColorStop(1.0, '#6b1111');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Tensioned elastic skin striation folds radiating across the wing web
        for (let f = 0; f < 56; f++) {
            const angle = (f / 56) * Math.PI * 0.62 + 0.08;
            const len = 460;
            ctx.strokeStyle = (f % 2 === 0)
                ? 'rgba(254, 202, 202, 0.20)'
                : 'rgba(69, 10, 10, 0.22)';
            ctx.lineWidth = 1.5 + (f % 3);
            ctx.beginPath();
            ctx.moveTo(12, 12);
            const midX = Math.cos(angle) * len * 0.52 + Math.sin(f * 1.9) * 14;
            const midY = Math.sin(angle) * len * 0.52 + Math.cos(f * 1.9) * 14;
            ctx.quadraticCurveTo(midX, midY, Math.cos(angle) * len, Math.sin(angle) * len);
            ctx.stroke();
        }

        // Branching arterial blood vessels & fine capillaries inside the wing patagium
        const drawVeinBranch = (x1, y1, angle, length, width, depth) => {
            if (depth <= 0 || length < 10) return;
            const x2 = x1 + Math.cos(angle) * length;
            const y2 = y1 + Math.sin(angle) * length;
            const ctrlX = (x1 + x2) * 0.5 + Math.sin(depth * 3.1 + x1 * 0.03) * (length * 0.14);
            const ctrlY = (y1 + y2) * 0.5 + Math.cos(depth * 2.7 + y1 * 0.03) * (length * 0.14);

            ctx.strokeStyle = depth > 2 ? 'rgba(69, 10, 10, 0.52)' : 'rgba(127, 29, 29, 0.36)';
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.quadraticCurveTo(ctrlX, ctrlY, x2, y2);
            ctx.stroke();

            const subSeed = Math.sin(x1 * 0.07 + y1 * 0.11 + depth);
            drawVeinBranch(x2, y2, angle - 0.28 + subSeed * 0.08, length * 0.72, width * 0.68, depth - 1);
            drawVeinBranch(x2, y2, angle + 0.31 - subSeed * 0.08, length * 0.68, width * 0.65, depth - 1);
        };

        for (let v = 0; v < 7; v++) {
            const startAngle = 0.18 + v * 0.19;
            drawVeinBranch(20, 20, startAngle, 115, 3.2, 4);
        }

        // Mottled leathery dermal pores and cellular texture
        for (let i = 0; i < 1800; i++) {
            const mx = (Math.sin(i * 97.3 + 17.1) * 0.5 + 0.5) * canvas.width;
            const my = (Math.cos(i * 181.9 + 53.7) * 0.5 + 0.5) * canvas.height;
            const r = 1.2 + (i % 4) * 1.1;
            ctx.fillStyle = (i % 3 === 0)
                ? 'rgba(254, 226, 226, 0.14)'
                : 'rgba(69, 10, 10, 0.16)';
            ctx.beginPath();
            ctx.arc(mx, my, r, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        return texture;
    },

    /**
     * Generates a procedural keratin horn & bone texture with annular growth rings
     * and longitudinal bone flutes for horns, osteoderm spines, wing bones, and talons.
     */
    createDragonHornBoneTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        baseGrad.addColorStop(0.0, '#fffbeb');
        baseGrad.addColorStop(0.55, '#fde68a');
        baseGrad.addColorStop(0.85, '#b45309');
        baseGrad.addColorStop(1.0, '#451a03');
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Annular keratin growth rings around the horn circumference
        for (let y = 6; y < canvas.height; y += 10) {
            ctx.strokeStyle = (y % 20 === 6)
                ? 'rgba(69, 26, 3, 0.45)'
                : 'rgba(255, 251, 235, 0.42)';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += 16) {
                const dy = Math.sin(x * 0.08 + y * 0.15) * 2.0;
                if (x === 0) ctx.moveTo(x, y + dy);
                else ctx.lineTo(x, y + dy);
            }
            ctx.stroke();
        }

        // Longitudinal bone flutes and weathering grooves
        for (let x = 0; x < canvas.width; x += 5) {
            ctx.strokeStyle = (x % 10 === 0)
                ? 'rgba(69, 26, 3, 0.28)'
                : 'rgba(255, 255, 255, 0.20)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + Math.sin(x * 0.2) * 3, canvas.height);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        return texture;
    },

    /**
     * Builds a subdivided, aerodynamically cambered 3D wing membrane panel between
     * origin, p1, and p2 with a natural upward airfoil arch, scalloped trailing edge,
     * and full UV coordinates so procedural membrane textures & bump maps render cleanly.
     */
    createCamberedWingPanelGeometry(origin, p1, p2, camberHeight = 0.24, radialSteps = 6, spanSteps = 6) {
        const positions = [];
        const uvs = [];
        const indices = [];

        for (let r = 0; r <= radialSteps; r++) {
            const u = r / radialSteps;
            for (let s = 0; s <= spanSteps; s++) {
                const v = s / spanSteps;
                // Interpolate along the two bounding finger bone spars from origin
                const edge1X = origin.x + (p1.x - origin.x) * u;
                const edge1Y = origin.y + (p1.y - origin.y) * u;
                const edge1Z = origin.z + (p1.z - origin.z) * u;

                const edge2X = origin.x + (p2.x - origin.x) * u;
                const edge2Y = origin.y + (p2.y - origin.y) * u;
                const edge2Z = origin.z + (p2.z - origin.z) * u;

                let vx = edge1X + (edge2X - edge1X) * v;
                let vy = edge1Y + (edge2Y - edge1Y) * v;
                let vz = edge1Z + (edge2Z - edge1Z) * v;

                // Parabolic airfoil camber arch across the membrane web
                const webArc = Math.sin(v * Math.PI) * Math.sin(u * Math.PI * 0.88);
                vy += webArc * camberHeight;

                // Scalloped concave trailing edge between wing finger tips
                const trailingScallop = Math.pow(u, 1.8) * Math.sin(v * Math.PI);
                vz -= trailingScallop * 0.28;

                positions.push(vx, vy, vz);
                uvs.push(u, v);
            }
        }

        const stride = spanSteps + 1;
        for (let r = 0; r < radialSteps; r++) {
            for (let s = 0; s < spanSteps; s++) {
                const a = r * stride + s;
                const b = (r + 1) * stride + s;
                const c = (r + 1) * stride + (s + 1);
                const d = r * stride + (s + 1);
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }

        const geo = new THREE.BufferGeometry();
        geo.setIndex(indices);
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geo.computeVertexNormals();
        return geo;
    },

    /**
     * Builds a realistic, anatomical and textured 3D Flying Dragon model representing the cyclist.
     */
    buildFlyingDragon() {
        this.dragonGroup = new THREE.Group();

        this.dragonScalesTexture = this.createDragonScalesTexture();
        this.dragonDarkScalesTexture = this.createDragonScalesTexture();
        this.dragonDarkScalesTexture.repeat.set(2.5, 2.5);
        this.dragonScuteTexture = this.createDragonScuteArmorTexture();
        this.dragonWingMembraneTexture = this.createDragonWingMembraneTexture();
        this.dragonHornBoneTexture = this.createDragonHornBoneTexture();

        const scaleMat = new THREE.MeshPhongMaterial({
            color: 0xdc2626,
            map: this.dragonScalesTexture,
            bumpMap: this.dragonScalesTexture,
            bumpScale: 0.085,
            emissive: 0x3b0707,
            specular: 0xfca5a5,
            shininess: 92
        });
        const darkScaleMat = new THREE.MeshPhongMaterial({
            color: 0x991b1b,
            map: this.dragonDarkScalesTexture,
            bumpMap: this.dragonDarkScalesTexture,
            bumpScale: 0.095,
            emissive: 0x2e0505,
            specular: 0xf87171,
            shininess: 78
        });
        const scuteArmorMat = new THREE.MeshPhongMaterial({
            color: 0xd97706,
            map: this.dragonScuteTexture,
            bumpMap: this.dragonScuteTexture,
            bumpScale: 0.07,
            emissive: 0x451a03,
            specular: 0xfde047,
            shininess: 88
        });
        const wingBoneMat = new THREE.MeshPhongMaterial({
            color: 0x7f1d1d,
            map: this.dragonHornBoneTexture,
            bumpMap: this.dragonHornBoneTexture,
            bumpScale: 0.055,
            emissive: 0x3b0707,
            specular: 0xfecaca,
            shininess: 85
        });
        const wingMembraneMat = new THREE.MeshPhongMaterial({
            color: 0xef4444,
            map: this.dragonWingMembraneTexture,
            bumpMap: this.dragonWingMembraneTexture,
            bumpScale: 0.045,
            emissive: 0x6b1010,
            specular: 0xfda4af,
            shininess: 52,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.90
        });
        const hornMat = new THREE.MeshPhongMaterial({
            color: 0xfef3c7,
            map: this.dragonHornBoneTexture,
            bumpMap: this.dragonHornBoneTexture,
            bumpScale: 0.06,
            emissive: 0x451a03,
            specular: 0xffffff,
            shininess: 115
        });
        const clawMat = new THREE.MeshPhongMaterial({
            color: 0x1e293b,
            map: this.dragonHornBoneTexture,
            bumpMap: this.dragonHornBoneTexture,
            bumpScale: 0.04,
            specular: 0xcbd5e1,
            shininess: 120
        });

        // Helper to organically sculpt sphere/cylinder vertices and recompute smooth normals
        const sculptGeometry = (geo, deformFn) => {
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const vx = pos.getX(i);
                const vy = pos.getY(i);
                const vz = pos.getZ(i);
                const [nx, ny, nz] = deformFn(vx, vy, vz);
                pos.setXYZ(i, nx, ny, nz);
            }
            pos.needsUpdate = true;
            geo.computeVertexNormals();
            return geo;
        };

        // 1. Sculpted Muscular Thorax / Ribcage, Waist Bridge, Tapered Abdomen & Pelvis
        const chestGeo = sculptGeometry(new THREE.SphereGeometry(1.30, 24, 18), (x, y, z) => {
            // Broad muscular dorsal latissimus & deep avian/dragon pectoral flight keel below
            const ribWave = Math.sin(z * 5.2) * 0.032 * Math.max(0, 1 - Math.abs(y) * 0.7);
            const keelDrop = (y < 0) ? Math.pow(Math.max(0, 1 - Math.abs(x) * 0.85), 1.6) * 0.22 : 0;
            const dorsalRidge = (y > 0.4) ? Math.pow(Math.max(0, 1 - Math.abs(x) * 1.2), 2.0) * 0.12 : 0;
            const taperZ = (z > 0) ? (1.0 - z * 0.08) : (1.0 - Math.abs(z) * 0.04);
            return [
                x * (1.10 + ribWave) * taperZ,
                y * 0.94 - keelDrop + dorsalRidge,
                z * 1.68
            ];
        });
        const chestMesh = new THREE.Mesh(chestGeo, scaleMat);
        chestMesh.position.set(0, 0.12, -0.58);
        this.dragonGroup.add(chestMesh);

        // Pectoral Flight Muscle Lobes on Either Side of the Sternum Keel
        [-0.46, 0.46].forEach((px) => {
            const pecGeo = new THREE.SphereGeometry(0.68, 16, 12);
            pecGeo.scale(0.88, 0.66, 1.55);
            const pecMesh = new THREE.Mesh(pecGeo, darkScaleMat);
            pecMesh.position.set(px, -0.34, -0.78);
            pecMesh.rotation.z = px * 0.28;
            this.dragonGroup.add(pecMesh);
        });

        const abdomenGeo = sculptGeometry(new THREE.SphereGeometry(1.04, 22, 16), (x, y, z) => {
            const taper = 1.0 - (z / 1.04) * 0.14;
            const muscleFlank = Math.sin(z * 4.5) * 0.025;
            return [
                x * (0.94 + muscleFlank) * taper,
                y * 0.85 * taper + Math.sin(z * 1.2) * 0.04,
                z * 1.78
            ];
        });
        const abdomenMesh = new THREE.Mesh(abdomenGeo, scaleMat);
        abdomenMesh.position.set(0, 0.05, 1.35);
        this.dragonGroup.add(abdomenMesh);

        const pelvisGeo = sculptGeometry(new THREE.SphereGeometry(0.88, 18, 14), (x, y, z) => {
            const taper = 1.0 - (z / 0.88) * 0.18;
            return [x * 0.96 * taper, y * 0.84 * taper, z * 1.32];
        });
        const pelvisMesh = new THREE.Mesh(pelvisGeo, darkScaleMat);
        pelvisMesh.position.set(0, 0.02, 2.65);
        this.dragonGroup.add(pelvisMesh);

        // Muscular Deltoid Shoulders & Iliac Hip Haunches
        [-0.96, 0.96].forEach((sideX) => {
            const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 14), darkScaleMat);
            shoulder.scale.set(0.94, 0.88, 1.36);
            shoulder.position.set(sideX, 0.34, -0.86);
            shoulder.rotation.y = sideX * 0.15;
            this.dragonGroup.add(shoulder);

            const hipHaunch = new THREE.Mesh(new THREE.SphereGeometry(0.56, 14, 12), darkScaleMat);
            hipHaunch.scale.set(0.86, 0.92, 1.28);
            hipHaunch.position.set(sideX * 0.84, 0.10, 2.18);
            this.dragonGroup.add(hipHaunch);
        });

        // Lateral Flank Osteoderm Armor Scale Ridges along Both Sides of the Torso
        [-1, 1].forEach((side) => {
            for (let f = 0; f < 7; f++) {
                const osteo = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.38, 6), darkScaleMat);
                const fz = -1.35 + f * 0.58;
                const fx = side * (1.28 - f * 0.065);
                osteo.position.set(fx, 0.14 - f * 0.02, fz);
                osteo.rotation.z = -side * 1.15;
                osteo.rotation.x = -0.35;
                this.dragonGroup.add(osteo);
            }
        });

        // Curved Overlapping Golden-Bronze Ventral Scute Plates along Chest & Belly
        for (let v = 0; v < 9; v++) {
            const w = 1.32 - Math.abs(v - 2.6) * 0.11;
            const scuteGeo = sculptGeometry(new THREE.BoxGeometry(w, 0.22, 0.64, 8, 2, 4), (x, y, z) => {
                const archY = Math.pow(x / Math.max(0.3, w * 0.5), 2) * 0.18;
                const chevronZ = Math.abs(x) * 0.16;
                return [x, y + archY, z + chevronZ];
            });
            const scute = new THREE.Mesh(scuteGeo, scuteArmorMat);
            scute.position.set(0, -0.76 + v * 0.032, -1.85 + v * 0.54);
            scute.rotation.x = 0.11;
            this.dragonGroup.add(scute);
        }

        // 2. Articulated S-Curved 3-Segment Muscular Neck
        this.neckSegments = [];
        const neckPositions = [
            { y: 0.36, z: -2.15, rx: 0.22, r: 0.80 },
            { y: 0.70, z: -2.95, rx: 0.34, r: 0.69 },
            { y: 1.04, z: -3.66, rx: 0.18, r: 0.59 }
        ];
        neckPositions.forEach((np) => {
            const nGroup = new THREE.Group();
            nGroup.position.set(0, np.y, np.z);
            nGroup.rotation.x = np.rx;

            const nGeo = sculptGeometry(
                new THREE.CylinderGeometry(np.r * 0.86, np.r * 1.02, 1.12, 16, 4),
                (x, y, z) => {
                    const tendon = Math.cos(Math.atan2(z, x) * 2.0) * 0.04;
                    return [x * (1.0 + tendon), y, z * (0.94 - tendon * 0.5)];
                }
            );
            nGeo.rotateX(Math.PI / 2);
            const nMesh = new THREE.Mesh(nGeo, scaleMat);
            nGroup.add(nMesh);

            // Curved Ventral Throat Scute Plate
            const throatPlateGeo = sculptGeometry(
                new THREE.BoxGeometry(np.r * 1.15, 0.22, 0.90, 6, 2, 3),
                (x, y, z) => [x, y + (x * x) * 0.25, z + Math.abs(x) * 0.12]
            );
            const throatPlate = new THREE.Mesh(throatPlateGeo, scuteArmorMat);
            throatPlate.position.set(0, -np.r * 0.74, 0);
            nGroup.add(throatPlate);

            // Dorsal Cervical Spine + Lateral Neck Osteoderms
            const neckSpine = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.62, 8), hornMat);
            neckSpine.position.set(0, np.r * 0.86, 0);
            neckSpine.rotation.x = -0.38;
            nGroup.add(neckSpine);

            [-1, 1].forEach((side) => {
                const sideSpur = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.34, 6), hornMat);
                sideSpur.position.set(side * np.r * 0.88, np.r * 0.18, 0.08);
                sideSpur.rotation.z = -side * 1.1;
                sideSpur.rotation.x = -0.45;
                nGroup.add(sideSpur);
            });

            this.dragonGroup.add(nGroup);
            this.neckSegments.push(nGroup);
        });

        // 3. Sculpted Anatomical Dragon Head, Jaws, Upper/Lower Fangs, Tongue, Glossy Eyes & Horns
        this.dragonHeadGroup = new THREE.Group();
        this.dragonHeadGroup.position.set(0, 1.18, -4.35);

        // Sculpted Cranium / Parietal & Temporal Upper Skull
        const craniumGeo = sculptGeometry(new THREE.SphereGeometry(0.76, 20, 16), (x, y, z) => {
            const temporalFlare = (z > 0 && Math.abs(x) > 0.25) ? 1.18 : 1.0;
            const flatTop = (y > 0.25) ? 0.82 : 1.0;
            return [x * 0.92 * temporalFlare, y * 0.66 * flatTop, z * 1.08];
        });
        const cranium = new THREE.Mesh(craniumGeo, scaleMat);
        cranium.position.set(0, 0.14, 0.16);
        this.dragonHeadGroup.add(cranium);

        // Zygomatic Cheek Arches & Jaw Muscle Bulges
        [-0.52, 0.52].forEach((cx) => {
            const cheekBone = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 10), darkScaleMat);
            cheekBone.scale.set(0.85, 0.65, 1.35);
            cheekBone.position.set(cx, 0.02, 0.10);
            this.dragonHeadGroup.add(cheekBone);
        });

        // Elongated Sculpted Upper Snout, Maxilla & Nasal Bridge
        const snoutGeo = sculptGeometry(new THREE.ConeGeometry(0.72, 1.95, 16, 6), (x, y, z) => {
            const bridgeCrest = (z < -0.15) ? Math.max(0, 0.14 - Math.abs(x) * 0.25) : 0;
            return [x * 0.98, y, z * 0.68 - bridgeCrest];
        });
        snoutGeo.rotateX(-Math.PI / 2);
        const snout = new THREE.Mesh(snoutGeo, scaleMat);
        snout.position.set(0, 0.06, -1.06);
        this.dragonHeadGroup.add(snout);

        // Hooked Premaxillary Raptor-like Snout Tip & Nasal Hornlet
        const snoutTip = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.42, 10), darkScaleMat);
        snoutTip.position.set(0, -0.02, -1.96);
        snoutTip.rotation.x = -2.25;
        this.dragonHeadGroup.add(snoutTip);

        const nasalHorn = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.38, 8), hornMat);
        nasalHorn.position.set(0, 0.30, -1.52);
        nasalHorn.rotation.x = -0.28;
        this.dragonHeadGroup.add(nasalHorn);

        // Dorsal Nasal Bridge Scale Plates
        for (let ns = 0; ns < 4; ns++) {
            const bridgeScale = new THREE.Mesh(new THREE.BoxGeometry(0.34 - ns * 0.05, 0.08, 0.28), darkScaleMat);
            bridgeScale.position.set(0, 0.34 - ns * 0.035, -0.35 - ns * 0.30);
            bridgeScale.rotation.x = 0.12;
            this.dragonHeadGroup.add(bridgeScale);
        }

        // Upper Maxillary Ivory Fang Row
        const upperFangGeo = new THREE.ConeGeometry(0.05, 0.25, 7);
        [-0.32, 0.32].forEach((fx) => {
            for (let fz = 0; fz < 4; fz++) {
                const uFang = new THREE.Mesh(upperFangGeo, hornMat);
                uFang.position.set(fx * (1 - fz * 0.16), -0.14, -0.42 - fz * 0.32);
                uFang.rotation.x = Math.PI - 0.12;
                this.dragonHeadGroup.add(uFang);
            }
        });

        // Flared Nostrils with Raised Scale Rims & Fiery Inner Glow
        const nostrilRimGeo = new THREE.TorusGeometry(0.11, 0.04, 8, 12);
        const nostrilGeo = new THREE.SphereGeometry(0.09, 8, 8);
        const nostrilMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
        [-0.23, 0.23].forEach((nx) => {
            const rim = new THREE.Mesh(nostrilRimGeo, darkScaleMat);
            rim.position.set(nx, 0.18, -1.62);
            rim.rotation.x = 0.55;
            rim.rotation.y = nx > 0 ? 0.45 : -0.45;
            this.dragonHeadGroup.add(rim);

            const nostril = new THREE.Mesh(nostrilGeo, nostrilMat);
            nostril.position.set(nx, 0.17, -1.62);
            this.dragonHeadGroup.add(nostril);
        });

        // Articulated Lower Jaw with Mandible Armor, Chin Spikes, Tongue & Conical Ivory Fangs
        this.dragonJawGroup = new THREE.Group();
        this.dragonJawGroup.position.set(0, -0.22, -0.15);
        const lowerJawGeo = sculptGeometry(new THREE.ConeGeometry(0.56, 1.62, 14, 4), (x, y, z) => {
            return [x * 0.96, y, z * 0.46];
        });
        lowerJawGeo.rotateX(-Math.PI / 2);
        const lowerJawMesh = new THREE.Mesh(lowerJawGeo, scuteArmorMat);
        lowerJawMesh.position.set(0, 0, -0.74);
        this.dragonJawGroup.add(lowerJawMesh);

        // Inner Forked Dragon Tongue
        const tongueMat = new THREE.MeshPhongMaterial({
            color: 0xe11d48,
            emissive: 0x881337,
            specular: 0xfda4af,
            shininess: 95
        });
        const tongueBase = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.95), tongueMat);
        tongueBase.position.set(0, 0.09, -0.62);
        this.dragonJawGroup.add(tongueBase);

        // Chin Beard Osteoderm Spikes under the Mandible
        for (let cs = 0; cs < 3; cs++) {
            const chinSpike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.26 - cs * 0.04, 6), hornMat);
            chinSpike.position.set(0, -0.16 + cs * 0.02, -0.45 - cs * 0.36);
            chinSpike.rotation.x = 2.45;
            this.dragonJawGroup.add(chinSpike);
        }

        const fangGeo = new THREE.ConeGeometry(0.055, 0.27, 7);
        [-0.28, 0.28].forEach((fx) => {
            for (let fz = 0; fz < 4; fz++) {
                const fang = new THREE.Mesh(fangGeo, hornMat);
                fang.position.set(fx * (1 - fz * 0.16), 0.14, -0.38 - fz * 0.30);
                fang.rotation.x = -0.14;
                this.dragonJawGroup.add(fang);
            }
        });
        this.dragonHeadGroup.add(this.dragonJawGroup);

        // Supraorbital Brow Ridges & Multi-Layer Glossy Slit-Pupil Dragon Eyes (with Cornea Lens)
        const socketGeo = new THREE.SphereGeometry(0.20, 12, 12);
        const eyeGeo = new THREE.SphereGeometry(0.17, 14, 14);
        const eyeMat = new THREE.MeshPhongMaterial({
            color: 0xfacc15,
            emissive: 0xf59e0b,
            emissiveIntensity: 0.75,
            specular: 0xffffff,
            shininess: 140
        });
        const pupilGeo = new THREE.BoxGeometry(0.05, 0.27, 0.09);
        const pupilMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
        const corneaGeo = new THREE.SphereGeometry(0.182, 14, 14);
        const corneaMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 180,
            transparent: true,
            opacity: 0.28
        });
        const browGeo = new THREE.CylinderGeometry(0.09, 0.15, 0.82, 8);
        browGeo.rotateX(Math.PI / 2);

        [-1, 1].forEach((side) => {
            const socket = new THREE.Mesh(socketGeo, clawMat);
            socket.scale.set(0.65, 0.95, 1.15);
            socket.position.set(side * 0.52, 0.24, -0.22);
            this.dragonHeadGroup.add(socket);

            const eye = new THREE.Mesh(eyeGeo, eyeMat);
            eye.position.set(side * 0.56, 0.24, -0.22);
            this.dragonHeadGroup.add(eye);

            const pupil = new THREE.Mesh(pupilGeo, pupilMat);
            pupil.position.set(side * 0.695, 0.24, -0.26);
            this.dragonHeadGroup.add(pupil);

            const cornea = new THREE.Mesh(corneaGeo, corneaMat);
            cornea.position.set(side * 0.57, 0.24, -0.22);
            this.dragonHeadGroup.add(cornea);

            const brow = new THREE.Mesh(browGeo, darkScaleMat);
            brow.position.set(side * 0.55, 0.42, -0.22);
            brow.rotation.z = -side * 0.30;
            brow.rotation.y = side * 0.18;
            this.dragonHeadGroup.add(brow);
        });

        // Swept-Back Curved Multi-Segment Primary Horns, Temporal Horns & Webbed Cheek Frills
        [-1, 1].forEach((side) => {
            const hornGroup = new THREE.Group();
            hornGroup.position.set(side * 0.44, 0.46, 0.38);
            hornGroup.rotation.set(0.78, side * 0.26, -side * 0.18);

            // Basal Scale Collar at Horn Root
            const hornCollar = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.065, 8, 12), darkScaleMat);
            hornCollar.rotation.x = Math.PI / 2;
            hornGroup.add(hornCollar);

            const baseHorn = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.22, 0.98, 12), hornMat);
            baseHorn.position.y = 0.46;
            hornGroup.add(baseHorn);

            const midHorn = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, 0.98, 12), hornMat);
            midHorn.position.set(0, 1.34, 0.18);
            midHorn.rotation.x = 0.26;
            hornGroup.add(midHorn);

            const tipHorn = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.92, 12), hornMat);
            tipHorn.position.set(0, 2.16, 0.50);
            tipHorn.rotation.x = 0.44;
            hornGroup.add(tipHorn);

            this.dragonHeadGroup.add(hornGroup);

            // Secondary Temporal Crown Horn
            const tempHorn = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.82, 10), hornMat);
            tempHorn.position.set(side * 0.58, 0.30, 0.62);
            tempHorn.rotation.set(1.02, side * 0.32, -side * 0.28);
            this.dragonHeadGroup.add(tempHorn);

            // Secondary Cheek Frill Spines & Webbed Frill Fin
            for (let ch = 0; ch < 2; ch++) {
                const cheekHorn = new THREE.Mesh(new THREE.ConeGeometry(0.10 - ch * 0.02, 0.68 - ch * 0.14, 8), hornMat);
                cheekHorn.position.set(side * (0.66 - ch * 0.06), 0.04 - ch * 0.14, 0.48 + ch * 0.12);
                cheekHorn.rotation.x = 1.15 + ch * 0.12;
                cheekHorn.rotation.z = -side * (0.45 + ch * 0.15);
                this.dragonHeadGroup.add(cheekHorn);
            }
        });

        this.dragonGroup.add(this.dragonHeadGroup);

        // 4. Four Tucked Anatomical Legs, Elbow/Knee Spurs & 3-Toed + Dewclaw Curved Talons
        [-1, 1].forEach((side) => {
            // Forelegs tucked aerodynamically under the thorax
            const forelegGroup = new THREE.Group();
            forelegGroup.position.set(side * 0.92, -0.35, -0.95);

            const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.30, 0.98, 12), darkScaleMat);
            upperArm.rotation.x = 0.65;
            upperArm.position.set(0, -0.35, 0.25);
            forelegGroup.add(upperArm);

            const elbowJoint = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), darkScaleMat);
            elbowJoint.position.set(0, -0.64, 0.52);
            forelegGroup.add(elbowJoint);

            const foreArm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 0.88, 12), scaleMat);
            foreArm.rotation.x = -0.45;
            foreArm.position.set(0, -0.78, 0.15);
            forelegGroup.add(foreArm);

            const manus = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), darkScaleMat);
            manus.scale.set(1.1, 0.7, 1.3);
            manus.position.set(0, -1.04, -0.02);
            forelegGroup.add(manus);

            for (let c = -1; c <= 1; c++) {
                const toe = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 0.22, 8), scaleMat);
                toe.position.set(c * 0.11, -1.10, -0.10);
                toe.rotation.x = -0.65;
                forelegGroup.add(toe);

                const talon = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.36, 8), clawMat);
                talon.position.set(c * 0.11, -1.18, -0.22);
                talon.rotation.x = -1.15;
                forelegGroup.add(talon);
            }
            this.dragonGroup.add(forelegGroup);

            // Muscular Hindlegs tucked beside the pelvis
            const hindlegGroup = new THREE.Group();
            hindlegGroup.position.set(side * 0.88, -0.18, 2.05);

            const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.40, 1.18, 12), darkScaleMat);
            thigh.rotation.x = 0.82;
            thigh.position.set(0, -0.38, 0.38);
            hindlegGroup.add(thigh);

            const kneeJoint = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 10), scaleMat);
            kneeJoint.position.set(0, -0.62, 0.75);
            hindlegGroup.add(kneeJoint);

            const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.27, 1.02, 12), scaleMat);
            shin.rotation.x = 1.25;
            shin.position.set(0, -0.68, 1.12);
            hindlegGroup.add(shin);

            const pes = new THREE.Mesh(new THREE.SphereGeometry(0.20, 10, 8), darkScaleMat);
            pes.scale.set(1.15, 0.75, 1.35);
            pes.position.set(0, -0.82, 1.46);
            hindlegGroup.add(pes);

            for (let c = -1; c <= 1; c++) {
                const talon = new THREE.Mesh(new THREE.ConeGeometry(0.072, 0.44, 8), clawMat);
                talon.position.set(c * 0.13, -0.90, 1.66);
                talon.rotation.x = 1.72;
                hindlegGroup.add(talon);
            }
            this.dragonGroup.add(hindlegGroup);
        });

        // 5. Realistic Multi-Jointed Bat/Dragon Wings (Arm Bones, Propatagium, Wrist Thumb Claws, 4 Finger Spars & Cambered UV Patagium Membranes)
        const buildAnatomicalWing = (side) => {
            const shoulderPivot = new THREE.Group();
            shoulderPivot.position.set(side * 0.95, 0.48, -0.65);

            // Muscular Wing Root Deltoid Cap
            const rootMuscle = new THREE.Mesh(new THREE.SphereGeometry(0.36, 12, 10), scaleMat);
            rootMuscle.scale.set(1.35, 0.85, 1.15);
            rootMuscle.position.set(side * 0.25, 0.04, 0.02);
            shoulderPivot.add(rootMuscle);

            // Humerus (Upper Wing Arm Bone) angling slightly back to the elbow
            const elbowPos = { x: side * 1.48, y: 0.08, z: 0.18 };
            const wristPos = { x: side * 3.05, y: 0.15, z: -0.55 };

            const humerusLen = Math.hypot(elbowPos.x, elbowPos.y, elbowPos.z);
            const humerusGeo = new THREE.CylinderGeometry(0.18, 0.25, humerusLen, 12);
            humerusGeo.translate(0, humerusLen / 2, 0);
            const humerus = new THREE.Mesh(humerusGeo, wingBoneMat);
            humerus.quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(elbowPos.x, elbowPos.y, elbowPos.z).normalize()
            );
            shoulderPivot.add(humerus);

            // Elbow Joint & Backward Olecranon Spur
            const elbowNode = new THREE.Mesh(new THREE.SphereGeometry(0.20, 10, 10), wingBoneMat);
            elbowNode.position.set(elbowPos.x, elbowPos.y, elbowPos.z);
            shoulderPivot.add(elbowNode);

            const elbowSpur = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.38, 8), hornMat);
            elbowSpur.position.set(elbowPos.x, elbowPos.y + 0.04, elbowPos.z + 0.22);
            elbowSpur.rotation.x = 1.45;
            shoulderPivot.add(elbowSpur);

            // Radius & Ulna (Forearm Bone Spar from Elbow to Wrist)
            const forearmVec = new THREE.Vector3(
                wristPos.x - elbowPos.x,
                wristPos.y - elbowPos.y,
                wristPos.z - elbowPos.z
            );
            const forearmLen = forearmVec.length();
            const forearmGeo = new THREE.CylinderGeometry(0.14, 0.19, forearmLen, 12);
            forearmGeo.translate(0, forearmLen / 2, 0);
            const forearmBone = new THREE.Mesh(forearmGeo, wingBoneMat);
            forearmBone.position.set(elbowPos.x, elbowPos.y, elbowPos.z);
            forearmBone.quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                forearmVec.clone().normalize()
            );
            shoulderPivot.add(forearmBone);

            // Leading-Edge Propatagium Membrane (Shoulder/Neck Root to Wrist via Elbow)
            const propatagiumGeo = this.createCamberedWingPanelGeometry(
                elbowPos,
                { x: 0, y: 0.05, z: -0.45 },
                wristPos,
                0.12,
                4,
                4
            );
            const propatagium = new THREE.Mesh(propatagiumGeo, wingMembraneMat);
            shoulderPivot.add(propatagium);

            // Inner Plagiopatagium Membrane (stretching from shoulder/elbow/wrist to torso flank & hip)
            const innerMem1Geo = this.createCamberedWingPanelGeometry(
                { x: 0, y: 0, z: -0.1 },
                wristPos,
                { x: side * 2.55, y: -0.05, z: 2.20 },
                0.22,
                6,
                6
            );
            shoulderPivot.add(new THREE.Mesh(innerMem1Geo, wingMembraneMat));

            const innerMem2Geo = this.createCamberedWingPanelGeometry(
                { x: 0, y: 0, z: -0.1 },
                { x: side * 2.55, y: -0.05, z: 2.20 },
                { x: 0, y: -0.14, z: 2.65 },
                0.16,
                5,
                5
            );
            shoulderPivot.add(new THREE.Mesh(innerMem2Geo, wingMembraneMat));

            // Outer Wing Wrist Joint (articulates dynamically during wingbeats)
            const wristPivot = new THREE.Group();
            wristPivot.position.set(wristPos.x, wristPos.y, wristPos.z);

            const wristKnuckle = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), wingBoneMat);
            wristPivot.add(wristKnuckle);

            // Forward-pointing Curved Wing Thumb Claw at Wrist
            const thumbClaw = new THREE.Mesh(new THREE.ConeGeometry(0.095, 0.62, 10), hornMat);
            thumbClaw.rotation.x = -Math.PI / 2 + 0.18;
            thumbClaw.rotation.z = -side * 0.22;
            thumbClaw.position.set(side * 0.08, 0.08, -0.38);
            wristPivot.add(thumbClaw);

            // 4 Radiating Wing Finger Bone Spars + Cambered UV Webbed Membrane Panels
            const fingerTips = [
                { x: side * 5.35, y: 0.06, z: 0.12 },
                { x: side * 4.75, y: -0.06, z: 1.92 },
                { x: side * 3.18, y: -0.13, z: 3.25 },
                { x: -side * 0.48, y: -0.18, z: 2.80 }
            ];

            fingerTips.forEach((tip, idx) => {
                if (idx < 3) {
                    const midKnuckle = {
                        x: tip.x * 0.54,
                        y: tip.y * 0.54 + 0.07,
                        z: tip.z * 0.54 - 0.08
                    };
                    // Proximal Phalanx Spar
                    const v1 = new THREE.Vector3(midKnuckle.x, midKnuckle.y, midKnuckle.z);
                    const len1 = v1.length();
                    const spar1Geo = new THREE.CylinderGeometry(0.075, 0.125, len1, 10);
                    spar1Geo.translate(0, len1 / 2, 0);
                    const spar1 = new THREE.Mesh(spar1Geo, wingBoneMat);
                    spar1.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v1.clone().normalize());
                    wristPivot.add(spar1);

                    // Knuckle Joint Node
                    const knuckleNode = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), wingBoneMat);
                    knuckleNode.position.set(midKnuckle.x, midKnuckle.y, midKnuckle.z);
                    wristPivot.add(knuckleNode);

                    // Distal Phalanx Spar
                    const v2 = new THREE.Vector3(tip.x - midKnuckle.x, tip.y - midKnuckle.y, tip.z - midKnuckle.z);
                    const len2 = v2.length();
                    const spar2Geo = new THREE.CylinderGeometry(0.032, 0.075, len2, 10);
                    spar2Geo.translate(0, len2 / 2, 0);
                    const spar2 = new THREE.Mesh(spar2Geo, wingBoneMat);
                    spar2.position.set(midKnuckle.x, midKnuckle.y, midKnuckle.z);
                    spar2.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v2.clone().normalize());
                    wristPivot.add(spar2);

                    // Wingtip Keratin Spur
                    const tipSpur = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.24, 7), hornMat);
                    tipSpur.position.set(tip.x, tip.y, tip.z);
                    tipSpur.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v2.clone().normalize());
                    wristPivot.add(tipSpur);
                }

                if (idx < fingerTips.length - 1) {
                    const nextTip = fingerTips[idx + 1];
                    const webGeo = this.createCamberedWingPanelGeometry(
                        { x: 0, y: 0, z: 0 },
                        tip,
                        nextTip,
                        0.26 - idx * 0.04,
                        6,
                        6
                    );
                    const webMesh = new THREE.Mesh(webGeo, wingMembraneMat);
                    wristPivot.add(webMesh);
                }
            });

            shoulderPivot.add(wristPivot);
            return { shoulderPivot, wristPivot };
        };

        const leftWing = buildAnatomicalWing(-1);
        this.leftWingPivot = leftWing.shoulderPivot;
        this.leftOuterWingPivot = leftWing.wristPivot;
        this.dragonGroup.add(this.leftWingPivot);

        const rightWing = buildAnatomicalWing(1);
        this.rightWingPivot = rightWing.shoulderPivot;
        this.rightOuterWingPivot = rightWing.wristPivot;
        this.dragonGroup.add(this.rightWingPivot);

        // 6. Dorsal Osteoderm Ridge Spines & Scalloped Dorsal Fin Webbing along the Back
        const backSpineGeo = new THREE.ConeGeometry(0.18, 0.78, 9);
        const collarGeo = new THREE.CylinderGeometry(0.19, 0.24, 0.16, 10);
        for (let s = 0; s < 7; s++) {
            const sy = 0.98 - s * 0.06;
            const sz = -1.25 + s * 0.65;
            const spineScale = 1.05 - Math.abs(s - 2) * 0.08;

            const collar = new THREE.Mesh(collarGeo, darkScaleMat);
            collar.position.set(0, sy - 0.26, sz + 0.08);
            this.dragonGroup.add(collar);

            const spine = new THREE.Mesh(backSpineGeo, hornMat);
            spine.scale.set(spineScale, spineScale, spineScale);
            spine.position.set(0, sy, sz);
            spine.rotation.x = -0.35;
            this.dragonGroup.add(spine);
        }

        // 7. Sinuous 10-Segment Whip Tail + Ventral Subcaudal Scutes & Ribbed Tail Spade Fin
        this.tailSegments = [];
        for (let t = 0; t < 10; t++) {
            const segGroup = new THREE.Group();
            const r1 = Math.max(0.12, 0.74 - t * 0.062);
            const r2 = Math.max(0.10, 0.68 - t * 0.062);
            const segGeo = new THREE.CylinderGeometry(r2, r1, 0.96, 14);
            segGeo.rotateX(Math.PI / 2);
            const segMesh = new THREE.Mesh(segGeo, t % 2 === 0 ? scaleMat : darkScaleMat);
            segGroup.add(segMesh);

            // Ventral Subcaudal Scute Armor on Tail Underside
            if (t < 8) {
                const tailScute = new THREE.Mesh(
                    new THREE.BoxGeometry(r1 * 1.15, 0.14, 0.72),
                    scuteArmorMat
                );
                tailScute.position.set(0, -r1 * 0.78, 0);
                segGroup.add(tailScute);
            }

            const tailCrest = new THREE.Mesh(
                new THREE.ConeGeometry(Math.max(0.06, 0.15 - t * 0.01), 0.46 - t * 0.02, 8),
                hornMat
            );
            tailCrest.position.set(0, r1 * 0.86, 0);
            tailCrest.rotation.x = -0.38;
            segGroup.add(tailCrest);

            if (t === 9) {
                // Aerodynamic Ribbed Dragon Tail Spade Fin
                const spadeGeo = new THREE.ConeGeometry(0.92, 1.78, 12);
                spadeGeo.rotateX(Math.PI / 2);
                spadeGeo.scale(1.42, 0.16, 1.0);
                const spadeFin = new THREE.Mesh(spadeGeo, wingMembraneMat);
                spadeFin.position.set(0, 0, 0.78);
                segGroup.add(spadeFin);

                // Central Caudal Bone Spine & Lateral Fin Ribs
                const centralRib = new THREE.Mesh(new THREE.ConeGeometry(0.09, 1.85, 8), wingBoneMat);
                centralRib.rotateX(Math.PI / 2);
                centralRib.position.set(0, 0, 0.82);
                segGroup.add(centralRib);

                [-1, 1].forEach((side) => {
                    const sideRib = new THREE.Mesh(new THREE.ConeGeometry(0.05, 1.15, 6), hornMat);
                    sideRib.position.set(side * 0.52, 0, 0.55);
                    sideRib.rotation.x = Math.PI / 2;
                    sideRib.rotation.z = -side * 0.68;
                    segGroup.add(sideRib);
                });
            }

            segGroup.position.set(0, -0.04 * t, 3.15 + t * 0.78);
            this.dragonGroup.add(segGroup);
            this.tailSegments.push(segGroup);
        }

        this.dragonGroup.position.set(0, this.dragonCurrentY, 0);
        this.scene.add(this.dragonGroup);
    },

    /**
     * Resets animation references before building a new avatar figure.
     */
    resetAvatarAnimationParts() {
        this.leftWingPivot = null;
        this.rightWingPivot = null;
        this.leftOuterWingPivot = null;
        this.rightOuterWingPivot = null;
        this.dragonHeadGroup = null;
        this.dragonJawGroup = null;
        this.neckSegments = [];
        this.tailSegments = [];
        this.avatarAnimParts = {};
    },

    /**
     * Switches or initializes the active 3D avatar model in the scene.
     */
    buildActiveAvatar(avatarType = 'dragon') {
        this.currentAvatarType = avatarType || 'dragon';
        const defaultY = typeof GROUND_NEAR_TOUCH_ALTITUDE_Y !== 'undefined' ? GROUND_NEAR_TOUCH_ALTITUDE_Y : 1.35;
        let prevPos = new THREE.Vector3(this.dragonWorldX || 0, this.dragonCurrentY || defaultY, this.flightZ || 0);
        let prevRotY = -(this.dragonHeadingAngle || 0);
        let prevRotX = this.dragonPitchAngle || 0;
        let prevRotZ = this.dragonRollAngle || 0;

        if (this.dragonGroup) {
            prevPos.copy(this.dragonGroup.position);
            this.scene.remove(this.dragonGroup);
        }
        this.resetAvatarAnimationParts();

        if (this.currentAvatarType === 'fuchur') {
            this.buildFuchurLuckdragon();
        } else if (this.currentAvatarType === 'et_bike') {
            this.buildBoyWithBicycleAndET();
        } else if (this.currentAvatarType === 'delorean') {
            this.buildBackToTheFutureDeLorean();
        } else if (this.currentAvatarType === 'mars_ufo') {
            this.buildMarsAttacksUfo();
        } else {
            this.buildFlyingDragon();
        }

        if (this.dragonGroup) {
            this.dragonGroup.position.copy(prevPos);
            this.dragonGroup.rotation.order = 'YXZ';
            this.dragonGroup.rotation.y = prevRotY;
            this.dragonGroup.rotation.x = prevRotX;
            this.dragonGroup.rotation.z = prevRotZ;
        }
    },

    /**
     * Procedural pearlescent ivory-white & mother-of-pearl scale/fur texture for Fuchur (Falkor).
     * Combines iridescent pink/gold/champagne scalloped scales with lush wavy luckdragon fur locks.
     */
    createFuchurPearlFurScaleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        bgGrad.addColorStop(0.0, '#fffef9');
        bgGrad.addColorStop(0.32, '#fef9c3');
        bgGrad.addColorStop(0.65, '#fce7f3');
        bgGrad.addColorStop(1.0, '#f0f9ff');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Overlapping mother-of-pearl scalloped luckdragon scales with iridescent sheen
        const rows = 16;
        const cols = 14;
        const cellW = canvas.width / cols;
        const cellH = canvas.height / rows;
        for (let r = -1; r <= rows; r++) {
            for (let c = -1; c <= cols; c++) {
                const cx = c * cellW + (r % 2 === 0 ? 0 : cellW * 0.5);
                const cy = r * cellH;
                const rad = cellW * 0.62;
                const seed = Math.abs(Math.sin(r * 31.7 + c * 73.9));
                const scaleGrad = ctx.createRadialGradient(
                    cx - rad * 0.14,
                    cy - rad * 0.28,
                    rad * 0.08,
                    cx,
                    cy + rad * 0.1,
                    rad * 1.05
                );
                scaleGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.98)');
                scaleGrad.addColorStop(0.45, 'rgba(254, 249, 195, 0.88)');
                scaleGrad.addColorStop(0.75, seed > 0.45 ? 'rgba(251, 207, 232, 0.45)' : 'rgba(224, 242, 254, 0.42)');
                scaleGrad.addColorStop(1.0, 'rgba(180, 142, 98, 0.52)');
                ctx.fillStyle = scaleGrad;
                ctx.beginPath();
                ctx.arc(cx, cy, rad, 0.05 * Math.PI, 0.95 * Math.PI);
                ctx.quadraticCurveTo(cx, cy - rad * 0.35, cx + Math.cos(0.05 * Math.PI) * rad, cy + Math.sin(0.05 * Math.PI) * rad);
                ctx.fill();

                ctx.strokeStyle = 'rgba(202, 138, 4, 0.32)';
                ctx.lineWidth = 1.6;
                ctx.stroke();

                // Delicate mother-of-pearl growth striation ridges inside each scale
                for (let s = -2; s <= 2; s++) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
                    ctx.lineWidth = 0.9;
                    ctx.beginPath();
                    ctx.moveTo(cx + s * 4.5, cy - rad * 0.15);
                    ctx.lineTo(cx + s * 6.5, cy + rad * 0.72);
                    ctx.stroke();
                }
            }
        }

        // Lush silky flowing luckdragon fur strands over the pearlescent scales
        for (let i = 0; i < 1650; i++) {
            const x = (Math.sin(i * 73.1 + 19.7) * 0.5 + 0.5) * canvas.width;
            const y = (Math.cos(i * 139.3 + 41.2) * 0.5 + 0.5) * canvas.height;
            const len = 15 + (i % 16);
            const wave = Math.sin(i * 0.75) * 5.2;
            ctx.strokeStyle = i % 3 === 0
                ? 'rgba(255, 255, 255, 0.76)'
                : (i % 3 === 1 ? 'rgba(253, 230, 138, 0.34)' : 'rgba(244, 114, 182, 0.18)');
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(x + wave, y + len * 0.5, x + wave * 0.4, y + len);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 2);
        return texture;
    },

    /**
     * Procedural silky wavy golden-ivory mane & spaniel ear plumage texture for Fuchur (Falkor).
     */
    createFuchurSilkyManeTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        baseGrad.addColorStop(0.0, '#ffffff');
        baseGrad.addColorStop(0.45, '#fefce8');
        baseGrad.addColorStop(0.82, '#fef08a');
        baseGrad.addColorStop(1.0, '#f59e0b');
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Long wavy feathered locks of luckdragon mane hair
        for (let i = 0; i < 420; i++) {
            const x0 = (i / 420) * canvas.width + Math.sin(i * 13.7) * 4;
            const y0 = (Math.cos(i * 59.3) * 0.5 + 0.5) * 45;
            const y1 = y0 + 150 + (i % 65);
            const wave = Math.sin(i * 1.4) * 14;
            ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(180, 120, 40, 0.38)';
            ctx.lineWidth = 1.8 + (i % 3) * 0.7;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.bezierCurveTo(x0 + wave, (y0 + y1) * 0.38, x0 - wave * 0.8, (y0 + y1) * 0.72, x0 + wave * 0.3, y1);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        return texture;
    },

    /**
     * Builds Fuchur (Falkor the Luckdragon from Die unendliche Geschichte / The NeverEnding Story).
     * Features sculpted organic canine-lion-serpentine anatomy, iridescent mother-of-pearl scales & fur,
     * expressive ruby-amber eyes with glossy corneas, velvety nostrils, smiling upper lip jowls,
     * teeth & tongue, billowing multi-segment spaniel ears, 4 articulated furry legs with toe pads,
     * layered feathered shoulder glide wings, a 12-segment serpentine body with a fluffy tail fan,
     * and Atreyu riding atop Fuchur's neck wearing the golden AURYN amulet!
     */
    buildFuchurLuckdragon() {
        this.dragonGroup = new THREE.Group();
        const pearlTex = this.createFuchurPearlFurScaleTexture();
        const maneTex = (this.createFuchurSilkyManeTexture || window.Performed3DAvatarModels.createFuchurSilkyManeTexture).call(this);
        const hornTex = this.dragonHornBoneTexture || this.createDragonHornBoneTexture();

        // Helper to organically sculpt sphere/cylinder/box vertices and recompute smooth normals
        const sculptGeometry = (geo, deformFn) => {
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const vx = pos.getX(i);
                const vy = pos.getY(i);
                const vz = pos.getZ(i);
                const [nx, ny, nz] = deformFn(vx, vy, vz);
                pos.setXYZ(i, nx, ny, nz);
            }
            pos.needsUpdate = true;
            geo.computeVertexNormals();
            return geo;
        };

        const pearlFurMat = new THREE.MeshPhongMaterial({
            color: 0xfffdf7,
            map: pearlTex,
            bumpMap: pearlTex,
            bumpScale: 0.072,
            emissive: 0x2e2318,
            specular: 0xfef08a,
            shininess: 102
        });
        const maneFurMat = new THREE.MeshPhongMaterial({
            color: 0xfffbeb,
            map: maneTex,
            bumpMap: maneTex,
            bumpScale: 0.088,
            emissive: 0x3b2814,
            specular: 0xffffff,
            shininess: 92
        });
        const pinkPearlFurMat = new THREE.MeshPhongMaterial({
            color: 0xfce7f3,
            map: maneTex,
            bumpMap: maneTex,
            bumpScale: 0.065,
            emissive: 0x3b1828,
            specular: 0xffffff,
            shininess: 95
        });
        const bellyScuteMat = new THREE.MeshPhongMaterial({
            color: 0xfde68a,
            map: pearlTex,
            bumpMap: pearlTex,
            bumpScale: 0.055,
            emissive: 0x362410,
            specular: 0xfffbeb,
            shininess: 112
        });
        const noseMat = new THREE.MeshPhongMaterial({
            color: 0xf472b6,
            emissive: 0x4a0e28,
            specular: 0xffffff,
            shininess: 128
        });
        const clawMat = new THREE.MeshPhongMaterial({
            color: 0xfef3c7,
            map: hornTex,
            bumpMap: hornTex,
            bumpScale: 0.045,
            emissive: 0x291805,
            specular: 0xffffff,
            shininess: 135
        });

        // 1. Sculpted Serpentine Thorax, Supple Lion-Hound Waist & Posterior Haunches
        const chestGeo = sculptGeometry(new THREE.SphereGeometry(1.22, 24, 18), (x, y, z) => {
            const chestDeep = (y < 0) ? Math.pow(Math.max(0, 1 - Math.abs(x) * 0.8), 1.5) * 0.18 : 0;
            const furRipple = Math.sin(z * 5.0 + y * 3.0) * 0.025;
            const taperZ = (z > 0) ? (1.0 - z * 0.07) : (1.0 - Math.abs(z) * 0.03);
            return [
                x * (0.98 + furRipple) * taperZ,
                y * 0.90 - chestDeep,
                z * 1.82
            ];
        });
        const chestMesh = new THREE.Mesh(chestGeo, pearlFurMat);
        chestMesh.position.set(0, 0.14, -0.72);
        this.dragonGroup.add(chestMesh);

        // Fluffy Pectoral Chest Ruff Tufts at the Base of Fuchur's Neck
        for (let r = -2; r <= 2; r++) {
            const ruffTuft = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.78, 10), maneFurMat);
            ruffTuft.position.set(r * 0.24, -0.34 + Math.abs(r) * 0.06, -2.05 + Math.abs(r) * 0.12);
            ruffTuft.rotation.x = 1.95;
            ruffTuft.rotation.z = -r * 0.25;
            this.dragonGroup.add(ruffTuft);
        }

        const midTorsoGeo = sculptGeometry(new THREE.SphereGeometry(1.05, 22, 16), (x, y, z) => {
            const archY = Math.sin(z * 1.35) * 0.06;
            const taper = 1.0 - (z / 1.05) * 0.11;
            return [x * 0.92 * taper, y * 0.85 * taper + archY, z * 1.95];
        });
        const midTorsoMesh = new THREE.Mesh(midTorsoGeo, pearlFurMat);
        midTorsoMesh.position.set(0, 0.09, 1.32);
        this.dragonGroup.add(midTorsoMesh);

        // Muscular Furry Shoulder & Hip Haunches
        [-0.92, 0.92].forEach((sx) => {
            const shoulderHaunch = new THREE.Mesh(new THREE.SphereGeometry(0.58, 16, 12), pearlFurMat);
            shoulderHaunch.scale.set(0.88, 0.85, 1.38);
            shoulderHaunch.position.set(sx, 0.22, -0.88);
            this.dragonGroup.add(shoulderHaunch);

            const hipHaunch = new THREE.Mesh(new THREE.SphereGeometry(0.54, 14, 12), pearlFurMat);
            hipHaunch.scale.set(0.85, 0.88, 1.32);
            hipHaunch.position.set(sx * 0.88, 0.06, 2.02);
            this.dragonGroup.add(hipHaunch);
        });

        // Curved Overlapping Golden-Ivory Ventral Belly Scutes along Chest & Torso
        for (let v = 0; v < 9; v++) {
            const w = 1.24 - Math.abs(v - 3) * 0.08;
            const plateGeo = sculptGeometry(new THREE.BoxGeometry(w, 0.18, 0.64, 6, 2, 3), (x, y, z) => {
                const archY = Math.pow(x / Math.max(0.3, w * 0.5), 2) * 0.16;
                const chevronZ = Math.abs(x) * 0.14;
                return [x, y + archY, z + chevronZ];
            });
            const plate = new THREE.Mesh(plateGeo, bellyScuteMat);
            plate.position.set(0, -0.68 + v * 0.024, -1.92 + v * 0.56);
            plate.rotation.x = 0.08;
            this.dragonGroup.add(plate);
        }

        // Lush Multi-Row Dorsal Feathery Fur Mane Tufts along Fuchur's Spine
        for (let m = 0; m < 11; m++) {
            const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.26 - m * 0.01, 0.86, 10), maneFurMat);
            tuft.position.set(0, 0.94 - m * 0.028, -1.68 + m * 0.48);
            tuft.rotation.x = -0.64;
            this.dragonGroup.add(tuft);

            [-0.22, 0.22].forEach((mx) => {
                const sideLock = new THREE.Mesh(new THREE.ConeGeometry(0.16 - m * 0.006, 0.62, 8), pearlFurMat);
                sideLock.position.set(mx, 0.82 - m * 0.026, -1.58 + m * 0.48);
                sideLock.rotation.x = -0.72;
                sideLock.rotation.z = -mx * 0.95;
                this.dragonGroup.add(sideLock);
            });
        }

        // 2. 3-Segment S-Curved Luckdragon Neck with Fluffy Mane & Atreyu Rider
        this.neckSegments = [];
        const neckPositions = [
            { y: 0.38, z: -2.20, rx: 0.20, r: 0.80 },
            { y: 0.72, z: -3.02, rx: 0.30, r: 0.70 },
            { y: 1.05, z: -3.72, rx: 0.16, r: 0.62 }
        ];
        neckPositions.forEach((np, nIdx) => {
            const nGroup = new THREE.Group();
            nGroup.position.set(0, np.y, np.z);
            nGroup.rotation.x = np.rx;

            const nGeo = sculptGeometry(
                new THREE.CylinderGeometry(np.r * 0.88, np.r * 1.02, 1.18, 16, 4),
                (x, y, z) => {
                    const fluff = Math.cos(Math.atan2(z, x) * 3.0) * 0.035;
                    return [x * (1.0 + fluff), y, z * (0.95 - fluff * 0.4)];
                }
            );
            nGeo.rotateX(Math.PI / 2);
            nGroup.add(new THREE.Mesh(nGeo, pearlFurMat));

            // Center & Lateral Flowing Neck Mane Locks
            const maneCrest = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.82, 10), maneFurMat);
            maneCrest.position.set(0, np.r * 0.86, 0.06);
            maneCrest.rotation.x = -0.58;
            nGroup.add(maneCrest);

            [-1, 1].forEach((side) => {
                const sideMane = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.68, 8), maneFurMat);
                sideMane.position.set(side * np.r * 0.72, np.r * 0.45, 0.12);
                sideMane.rotation.x = -0.68;
                sideMane.rotation.z = -side * 0.55;
                nGroup.add(sideMane);
            });

            const throatScute = new THREE.Mesh(new THREE.BoxGeometry(np.r * 1.12, 0.16, 0.88), bellyScuteMat);
            throatScute.position.set(0, -np.r * 0.74, 0);
            nGroup.add(throatScute);

            // Iconic NeverEnding Story Detail: Young Warrior Atreyu Riding on Fuchur's Base Neck Segment holding onto the Mane!
            if (nIdx === 0) {
                const atreyuGroup = new THREE.Group();
                atreyuGroup.position.set(0, np.r * 0.74, 0.15);
                atreyuGroup.rotation.x = -0.12;

                const buckskinMat = new THREE.MeshPhongMaterial({ color: 0xb45309, specular: 0xfde68a, shininess: 40 });
                const skinMat = new THREE.MeshPhongMaterial({ color: 0xd97706, specular: 0xfef3c7, shininess: 55 });
                const hairMat = new THREE.MeshPhongMaterial({ color: 0x0f172a, specular: 0x475569, shininess: 85 });
                const cloakMat = new THREE.MeshPhongMaterial({ color: 0x78350f, side: THREE.DoubleSide, shininess: 35 });
                const aurynMat = new THREE.MeshPhongMaterial({
                    color: 0xfacc15,
                    emissive: 0x854d0e,
                    specular: 0xffffff,
                    shininess: 165
                });

                // Atreyu's Torso leaning heroically forward into the wind
                const aTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.62, 12), buckskinMat);
                aTorso.position.set(0, 0.28, -0.05);
                aTorso.rotation.x = 0.38;
                atreyuGroup.add(aTorso);

                // The Golden AURYN Medallion (Double Ouroboros Amulet of the Childlike Empress) on Chest
                const aurynAmulet = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.022, 8, 16), aurynMat);
                aurynAmulet.position.set(0, 0.36, -0.24);
                aurynAmulet.rotation.x = 0.38;
                atreyuGroup.add(aurynAmulet);

                // Billowing Plains-Hunter Cloak streaming back in the slipstream
                const cloakGeo = sculptGeometry(new THREE.BoxGeometry(0.46, 0.04, 0.72, 6, 1, 6), (x, y, z) => {
                    const ripple = Math.sin(z * 6.0 + x * 4.0) * 0.04 * (z + 0.36);
                    return [x * (1.0 + (z + 0.36) * 0.35), y + ripple, z];
                });
                const cloak = new THREE.Mesh(cloakGeo, cloakMat);
                cloak.position.set(0, 0.42, 0.34);
                cloak.rotation.x = -0.22;
                atreyuGroup.add(cloak);

                // Atreyu's Head, Silver Headband & Long Flowing Black Hair Locks
                const aHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), skinMat);
                aHead.position.set(0, 0.62, -0.20);
                atreyuGroup.add(aHead);

                const headband = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.02, 8, 16), aurynMat);
                headband.rotation.x = Math.PI / 2 - 0.15;
                headband.position.set(0, 0.67, -0.20);
                atreyuGroup.add(headband);

                for (let h = -2; h <= 2; h++) {
                    const hairLock = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.48, 7), hairMat);
                    hairLock.position.set(h * 0.055, 0.62 - Math.abs(h) * 0.02, 0.02 + Math.abs(h) * 0.03);
                    hairLock.rotation.x = 1.38;
                    hairLock.rotation.z = -h * 0.15;
                    atreyuGroup.add(hairLock);
                }

                // Arms reaching forward gripping Fuchur's golden-white neck fur & Legs straddling the neck
                [-1, 1].forEach((side) => {
                    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.058, 0.48, 8), skinMat);
                    arm.position.set(side * 0.22, 0.34, -0.28);
                    arm.rotation.x = 1.18;
                    arm.rotation.z = side * 0.25;
                    atreyuGroup.add(arm);

                    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.082, 0.56, 8), buckskinMat);
                    leg.position.set(side * 0.38, -0.05, 0.04);
                    leg.rotation.z = -side * 0.52;
                    leg.rotation.x = 0.25;
                    atreyuGroup.add(leg);
                });

                nGroup.add(atreyuGroup);
            }

            this.dragonGroup.add(nGroup);
            this.neckSegments.push(nGroup);
        });

        // 3. Sculpted Friendly Canine/Lion Luckdragon Head (Fuchur / Falkor)
        this.dragonHeadGroup = new THREE.Group();
        this.dragonHeadGroup.position.set(0, 1.22, -4.42);

        // Broad Domed Canine-Lion Cranium with Cheek Fluff
        const craniumGeo = sculptGeometry(new THREE.SphereGeometry(0.84, 22, 18), (x, y, z) => {
            const cheekFluff = (y < 0.05 && Math.abs(x) > 0.32) ? 1.16 : 1.0;
            const browDome = (y > 0.2 && z < 0.1) ? 1.08 : 1.0;
            return [x * 0.98 * cheekFluff, y * 0.86 * browDome, z * 1.14];
        });
        const cranium = new THREE.Mesh(craniumGeo, pearlFurMat);
        cranium.position.set(0, 0.18, 0.12);
        this.dragonHeadGroup.add(cranium);

        // Sculpted Plush Dog-Like Snout, Dorsal Nasal Scales & Warm Smiling Upper Flews (Jowls)
        const snoutGeo = sculptGeometry(new THREE.SphereGeometry(0.62, 20, 16), (x, y, z) => {
            const muzzleFlare = (z < -0.25) ? 1.10 : 1.0;
            const smileCurve = (y < 0) ? Math.sin(Math.abs(x) * 2.5) * 0.06 : 0;
            return [x * 0.96 * muzzleFlare, y * 0.68 + smileCurve, z * 1.58];
        });
        const snout = new THREE.Mesh(snoutGeo, pearlFurMat);
        snout.position.set(0, 0.03, -0.96);
        this.dragonHeadGroup.add(snout);

        // Mother-of-Pearl Nasal Bridge Scale Plates along Top of Snout
        for (let nb = 0; nb < 4; nb++) {
            const nasalPlate = new THREE.Mesh(new THREE.BoxGeometry(0.38 - nb * 0.04, 0.08, 0.28), bellyScuteMat);
            nasalPlate.position.set(0, 0.38 - nb * 0.045, -0.42 - nb * 0.28);
            nasalPlate.rotation.x = 0.16;
            this.dragonHeadGroup.add(nasalPlate);
        }

        // Plush Rounded Smiling Jowls & Whisker Pads on Either Side of the Muzzle
        [-0.42, 0.42].forEach((jx) => {
            const jowl = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 12), maneFurMat);
            jowl.scale.set(0.92, 0.78, 1.42);
            jowl.position.set(jx, -0.06, -0.86);
            jowl.rotation.z = jx * 0.22;
            this.dragonHeadGroup.add(jowl);

            // Friendly Cheek Tuft Spires
            for (let ct = 0; ct < 2; ct++) {
                const cheekTuft = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.48, 8), maneFurMat);
                cheekTuft.position.set(jx * 1.48, -0.04 - ct * 0.12, -0.22 + ct * 0.24);
                cheekTuft.rotation.z = -(jx > 0 ? 1 : -1) * 1.15;
                cheekTuft.rotation.x = 0.65;
                this.dragonHeadGroup.add(cheekTuft);
            }
        });

        // Sculpted Soft Pink Canine-Dragon Nose with Flared Velvety Nostrils & Philtrum Crease
        const nose = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 14), noseMat);
        nose.scale.set(1.32, 0.88, 0.94);
        nose.position.set(0, 0.13, -1.78);
        this.dragonHeadGroup.add(nose);

        const nostrilRimMat = new THREE.MeshPhongMaterial({ color: 0xdb2777, shininess: 95 });
        const nostrilMat = new THREE.MeshBasicMaterial({ color: 0x500724 });
        [-0.12, 0.12].forEach((nx) => {
            const nostrilRim = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.024, 8, 12), nostrilRimMat);
            nostrilRim.position.set(nx, 0.14, -1.94);
            nostrilRim.rotation.y = nx > 0 ? 0.42 : -0.42;
            nostrilRim.rotation.x = 0.25;
            this.dragonHeadGroup.add(nostrilRim);

            const nostril = new THREE.Mesh(new THREE.SphereGeometry(0.058, 8, 8), nostrilMat);
            nostril.position.set(nx, 0.14, -1.95);
            this.dragonHeadGroup.add(nostril);
        });

        // Long Flowing S-Curved Luckdragon Whiskers & Whisker Tendrils
        const whiskerTendrils = [];
        [-1, 1].forEach((side) => {
            const wPivot = new THREE.Group();
            wPivot.position.set(side * 0.46, -0.02, -1.28);

            // Long gracefully curved primary luckdragon barbel whisker (3 linked segments)
            const seg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.032, 0.56, 8), maneFurMat);
            seg1.rotation.z = -side * 1.25;
            seg1.rotation.y = -side * 0.45;
            seg1.position.set(side * 0.24, -0.04, 0.12);
            wPivot.add(seg1);

            const seg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.022, 0.62, 8), maneFurMat);
            seg2.rotation.z = -side * 1.05;
            seg2.rotation.x = 0.52;
            seg2.position.set(side * 0.58, -0.14, 0.42);
            wPivot.add(seg2);

            const seg3 = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.52, 8), maneFurMat);
            seg3.rotation.x = 1.28;
            seg3.rotation.z = -side * 0.48;
            seg3.position.set(side * 0.78, -0.22, 0.82);
            wPivot.add(seg3);

            // Secondary finer cheek whiskers
            for (let w = 0; w < 2; w++) {
                const whiskerGeo = new THREE.CylinderGeometry(0.010, 0.022, 0.95, 6);
                whiskerGeo.rotateZ(side * 1.18);
                const whisker = new THREE.Mesh(whiskerGeo, maneFurMat);
                whisker.position.set(side * 0.22, -0.06 - w * 0.07, 0.08 + w * 0.16);
                whisker.rotation.y = -side * (0.38 + w * 0.14);
                wPivot.add(whisker);
            }

            this.dragonHeadGroup.add(wPivot);
            whiskerTendrils.push(wPivot);
        });

        // Articulated Lower Jaw with Friendly Rounded Canine Teeth, Pink Tongue & Fluffy Chin Beard
        this.dragonJawGroup = new THREE.Group();
        this.dragonJawGroup.position.set(0, -0.20, -0.18);
        const lowerJaw = new THREE.Mesh(new THREE.SphereGeometry(0.48, 16, 12), pearlFurMat);
        lowerJaw.scale.set(0.94, 0.46, 1.58);
        lowerJaw.position.set(0, 0, -0.68);
        this.dragonJawGroup.add(lowerJaw);

        const tongueMat = new THREE.MeshPhongMaterial({
            color: 0xf43f5e,
            emissive: 0x4c0519,
            specular: 0xfda4af,
            shininess: 98
        });
        const tongue = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), tongueMat);
        tongue.scale.set(0.95, 0.28, 2.25);
        tongue.position.set(0, 0.09, -0.68);
        this.dragonJawGroup.add(tongue);

        // Friendly Rounded Ivory Canine Teeth on Lower & Upper Jaw
        [-0.24, 0.24].forEach((tx) => {
            const lowerTooth = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.15, 8), clawMat);
            lowerTooth.position.set(tx, 0.11, -1.02);
            this.dragonJawGroup.add(lowerTooth);

            const upperTooth = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.16, 8), clawMat);
            upperTooth.position.set(tx * 1.12, -0.12, -1.18);
            upperTooth.rotation.x = Math.PI;
            this.dragonHeadGroup.add(upperTooth);
        });

        // Layered Fluffy Chin Beard Locks under the Mandible
        for (let b = 0; b < 5; b++) {
            const offset = b - 2;
            const beardTuft = new THREE.Mesh(new THREE.ConeGeometry(0.14 - Math.abs(offset) * 0.015, 0.56 - Math.abs(offset) * 0.05, 8), maneFurMat);
            beardTuft.position.set(offset * 0.12, -0.18, -0.62 - (offset === 0 ? 0.26 : Math.abs(offset) * 0.05));
            beardTuft.rotation.x = 2.38;
            beardTuft.rotation.z = -offset * 0.15;
            this.dragonJawGroup.add(beardTuft);
        }
        this.dragonHeadGroup.add(this.dragonJawGroup);

        // Warm Expressive Ruby-Amber Eyes, Upper Eyelids, Glossy Cornea Lens & Swept Feathered Eyebrows
        const eyeSocketMat = new THREE.MeshPhongMaterial({ color: 0xfde68a, shininess: 65 });
        const eyeMat = new THREE.MeshPhongMaterial({
            color: 0xe11d48,
            emissive: 0x9f1239,
            emissiveIntensity: 0.68,
            specular: 0xffffff,
            shininess: 165
        });
        const irisRingMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
        const corneaMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 195,
            transparent: true,
            opacity: 0.28
        });

        [-1, 1].forEach((side) => {
            const socket = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 12), eyeSocketMat);
            socket.scale.set(0.85, 0.95, 1.12);
            socket.position.set(side * 0.45, 0.26, -0.29);
            this.dragonHeadGroup.add(socket);

            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.195, 16, 16), eyeMat);
            eye.position.set(side * 0.48, 0.26, -0.30);
            this.dragonHeadGroup.add(eye);

            const iris = new THREE.Mesh(new THREE.SphereGeometry(0.125, 12, 12), irisRingMat);
            iris.position.set(side * 0.54, 0.265, -0.39);
            this.dragonHeadGroup.add(iris);

            const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 12), pupilMat);
            pupil.position.set(side * 0.565, 0.27, -0.43);
            this.dragonHeadGroup.add(pupil);

            // Dual Specular Eye Catchlights (gives Fuchur his warm, wise gaze)
            const highlight = new THREE.Mesh(new THREE.SphereGeometry(0.044, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            highlight.position.set(side * 0.59, 0.325, -0.47);
            this.dragonHeadGroup.add(highlight);

            const subHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
            subHighlight.position.set(side * 0.58, 0.22, -0.46);
            this.dragonHeadGroup.add(subHighlight);

            const cornea = new THREE.Mesh(new THREE.SphereGeometry(0.205, 14, 14), corneaMat);
            cornea.position.set(side * 0.485, 0.26, -0.305);
            this.dragonHeadGroup.add(cornea);

            // Kind Upper Eyelid Fold
            const eyelid = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.042, 8, 14, Math.PI), pearlFurMat);
            eyelid.position.set(side * 0.49, 0.28, -0.31);
            eyelid.rotation.y = side * 0.55;
            eyelid.rotation.z = -side * 0.18;
            this.dragonHeadGroup.add(eyelid);

            // Lush Swept Multi-Tuft White-Gold Eyebrow Ridge
            const brow = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 0.82, 10), maneFurMat);
            brow.rotation.x = Math.PI / 2;
            brow.rotation.z = -side * 0.34;
            brow.position.set(side * 0.50, 0.49, -0.26);
            this.dragonHeadGroup.add(brow);

            for (let bt = 0; bt < 3; bt++) {
                const browTuft = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.45 + bt * 0.08, 8), maneFurMat);
                browTuft.position.set(side * (0.48 + bt * 0.08), 0.52 + bt * 0.03, -0.32 + bt * 0.22);
                browTuft.rotation.x = 1.12;
                browTuft.rotation.z = -side * (0.38 + bt * 0.12);
                this.dragonHeadGroup.add(browTuft);
            }
        });

        // Fuchur's Iconic Long Droopy Furry Spaniel-Like Ears (multi-layered with pink-pearl inner pinna, animate with watts!)
        const buildFuchurEar = (side) => {
            const earPivot = new THREE.Group();
            earPivot.position.set(side * 0.68, 0.24, 0.25);

            const earRoot = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), maneFurMat);
            earRoot.position.set(side * 0.08, -0.04, 0.08);
            earPivot.add(earRoot);

            const upperEar = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 14), maneFurMat);
            upperEar.scale.set(0.62, 1.38, 1.72);
            upperEar.position.set(side * 0.28, -0.26, 0.50);
            upperEar.rotation.z = side * 0.48;
            upperEar.rotation.x = 0.52;
            earPivot.add(upperEar);

            // Soft Rosy Mother-of-Pearl Inner Ear Cavity
            const innerPinna = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), pinkPearlFurMat);
            innerPinna.scale.set(0.42, 1.15, 1.45);
            innerPinna.position.set(side * 0.22, -0.30, 0.46);
            innerPinna.rotation.z = side * 0.48;
            innerPinna.rotation.x = 0.52;
            earPivot.add(innerPinna);

            const lowerPlume = new THREE.Mesh(new THREE.SphereGeometry(0.44, 16, 14), pearlFurMat);
            lowerPlume.scale.set(0.54, 1.18, 2.08);
            lowerPlume.position.set(side * 0.54, -0.54, 1.32);
            lowerPlume.rotation.z = side * 0.62;
            lowerPlume.rotation.x = 0.36;
            earPivot.add(lowerPlume);

            // Feathered Spaniel Ear Fringe Tips
            for (let ef = 0; ef < 4; ef++) {
                const fringe = new THREE.Mesh(new THREE.ConeGeometry(0.13 - ef * 0.015, 0.72, 8), maneFurMat);
                fringe.position.set(side * (0.46 + ef * 0.08), -0.66 + ef * 0.08, 1.95 + ef * 0.12);
                fringe.rotation.x = 1.42;
                fringe.rotation.z = -side * (0.35 + ef * 0.08);
                earPivot.add(fringe);
            }

            return earPivot;
        };
        const leftEar = buildFuchurEar(-1);
        const rightEar = buildFuchurEar(1);
        this.dragonHeadGroup.add(leftEar);
        this.dragonHeadGroup.add(rightEar);

        // Regal Lion-Like Double Crown Mane & Pearlescent Brow Hornlets around the Back of Fuchur's Skull
        [-1, 1].forEach((side) => {
            const hornlet = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.65, 10), clawMat);
            hornlet.position.set(side * 0.36, 0.55, 0.42);
            hornlet.rotation.x = 0.98;
            hornlet.rotation.z = -side * 0.25;
            this.dragonHeadGroup.add(hornlet);
        });

        for (let cm = 0; cm < 9; cm++) {
            const angle = ((cm / 8) - 0.5) * Math.PI * 0.92;
            const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.92, 10), maneFurMat);
            tuft.position.set(Math.sin(angle) * 0.72, Math.cos(angle) * 0.58 + 0.16, 0.58);
            tuft.rotation.x = 1.08;
            tuft.rotation.z = -angle * 0.62;
            this.dragonHeadGroup.add(tuft);
        }

        this.dragonGroup.add(this.dragonHeadGroup);

        // 4. Four Articulated Furry Luckdragon Legs with Elbow/Hock Feathering, Pink Paw Pads & Ivory Claws
        const forelegs = [];
        const hindlegs = [];
        [-1, 1].forEach((side) => {
            const fLeg = new THREE.Group();
            fLeg.position.set(side * 0.88, -0.32, -0.95);

            const fUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.32, 0.92, 12), pearlFurMat);
            fUpper.rotation.x = 0.62;
            fUpper.position.set(0, -0.30, 0.22);
            fLeg.add(fUpper);

            // Feathered Elbow Plume
            for (let ep = 0; ep < 3; ep++) {
                const elbowPlume = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.52, 8), maneFurMat);
                elbowPlume.position.set(side * 0.08, -0.42 - ep * 0.10, 0.54 + ep * 0.06);
                elbowPlume.rotation.x = 1.38;
                fLeg.add(elbowPlume);
            }

            const fForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.24, 0.72, 12), pearlFurMat);
            fForearm.rotation.x = -0.35;
            fForearm.position.set(0, -0.66, 0.34);
            fLeg.add(fForearm);

            const fPaw = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 12), maneFurMat);
            fPaw.scale.set(1.15, 0.75, 1.38);
            fPaw.position.set(0, -0.84, 0.24);
            fLeg.add(fPaw);

            // Soft Pink Lion-Dog Paw Pad underneath
            const fPad = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), noseMat);
            fPad.scale.set(1.1, 0.35, 1.15);
            fPad.position.set(0, -0.98, 0.24);
            fLeg.add(fPad);

            for (let c = -1.5; c <= 1.5; c += 1.0) {
                const toe = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 8), maneFurMat);
                toe.scale.set(0.9, 0.8, 1.3);
                toe.position.set(c * 0.085, -0.88, 0.02);
                fLeg.add(toe);

                const claw = new THREE.Mesh(new THREE.ConeGeometry(0.048, 0.28, 8), clawMat);
                claw.position.set(c * 0.085, -0.92, -0.12);
                claw.rotation.x = -1.18;
                fLeg.add(claw);
            }
            this.dragonGroup.add(fLeg);
            forelegs.push(fLeg);

            const hLeg = new THREE.Group();
            hLeg.position.set(side * 0.84, -0.22, 2.05);

            const hUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 1.08, 12), pearlFurMat);
            hUpper.rotation.x = 0.78;
            hUpper.position.set(0, -0.34, 0.35);
            hLeg.add(hUpper);

            const hShin = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.27, 0.78, 12), pearlFurMat);
            hShin.rotation.x = 1.12;
            hShin.position.set(0, -0.62, 0.74);
            hLeg.add(hShin);

            // Feathered Hock Fringe
            for (let hp = 0; hp < 3; hp++) {
                const hockPlume = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.56, 8), maneFurMat);
                hockPlume.position.set(side * 0.08, -0.52 - hp * 0.10, 0.92 + hp * 0.08);
                hockPlume.rotation.x = 1.45;
                hLeg.add(hockPlume);
            }

            const hPaw = new THREE.Mesh(new THREE.SphereGeometry(0.27, 14, 12), maneFurMat);
            hPaw.scale.set(1.18, 0.76, 1.42);
            hPaw.position.set(0, -0.82, 0.96);
            hLeg.add(hPaw);

            for (let c = -1.5; c <= 1.5; c += 1.0) {
                const claw = new THREE.Mesh(new THREE.ConeGeometry(0.052, 0.30, 8), clawMat);
                claw.position.set(c * 0.09, -0.90, 1.18);
                claw.rotation.x = 1.65;
                hLeg.add(claw);
            }
            this.dragonGroup.add(hLeg);
            hindlegs.push(hLeg);
        });

        // 5. Layered Feathered Shoulder Glide Plumes (mapped to leftWingPivot / rightWingPivot & outer pivots so watt flapping animates smoothly)
        const buildFuchurGlidePlume = (side) => {
            const pivot = new THREE.Group();
            pivot.position.set(side * 0.92, 0.25, -0.65);

            // Silky cambered feathered glide web between primary plumes
            const plumeWebGeo = this.createCamberedWingPanelGeometry(
                { x: 0, y: 0, z: 0 },
                { x: side * 2.15, y: 0.08, z: 0.45 },
                { x: side * 1.35, y: -0.18, z: 1.95 },
                0.16,
                5,
                5
            );
            const plumeWebMat = new THREE.MeshPhongMaterial({
                color: 0xfffbeb,
                map: maneTex,
                bumpMap: maneTex,
                bumpScale: 0.05,
                emissive: 0x3b2814,
                specular: 0xffffff,
                shininess: 85,
                side: THREE.DoubleSide
            });
            pivot.add(new THREE.Mesh(plumeWebGeo, plumeWebMat));

            // Primary & Secondary Covert Feather Rows
            for (let p = 0; p < 7; p++) {
                const plume = new THREE.Mesh(new THREE.ConeGeometry(0.22 - p * 0.018, 1.85 - p * 0.14, 10), maneFurMat);
                plume.position.set(side * (0.58 + p * 0.22), -0.04 * p, 0.32 + p * 0.26);
                plume.rotation.z = -side * (1.22 - p * 0.07);
                plume.rotation.x = 0.42;
                pivot.add(plume);

                const covert = new THREE.Mesh(new THREE.ConeGeometry(0.15 - p * 0.01, 1.15 - p * 0.08, 8), pinkPearlFurMat);
                covert.position.set(side * (0.42 + p * 0.16), 0.08 - 0.03 * p, 0.22 + p * 0.20);
                covert.rotation.z = -side * (1.12 - p * 0.06);
                covert.rotation.x = 0.38;
                pivot.add(covert);
            }

            // Articulated Outer Tip Plume Cluster
            const outerTipPivot = new THREE.Group();
            outerTipPivot.position.set(side * 1.65, -0.08, 0.95);
            for (let ot = 0; ot < 4; ot++) {
                const tipFeather = new THREE.Mesh(new THREE.ConeGeometry(0.13 - ot * 0.015, 1.25 - ot * 0.12, 8), pearlFurMat);
                tipFeather.position.set(side * (0.35 + ot * 0.14), -0.02 * ot, 0.18 + ot * 0.22);
                tipFeather.rotation.z = -side * (1.18 - ot * 0.08);
                tipFeather.rotation.x = 0.46;
                outerTipPivot.add(tipFeather);
            }
            pivot.add(outerTipPivot);

            return { pivot, outerTipPivot };
        };
        const leftGlide = buildFuchurGlidePlume(-1);
        const rightGlide = buildFuchurGlidePlume(1);
        this.leftWingPivot = leftGlide.pivot;
        this.leftOuterWingPivot = leftGlide.outerTipPivot;
        this.rightWingPivot = rightGlide.pivot;
        this.rightOuterWingPivot = rightGlide.outerTipPivot;
        this.dragonGroup.add(this.leftWingPivot);
        this.dragonGroup.add(this.rightWingPivot);

        // 6. Long Serpentine 12-Segment Luckdragon Body, Lateral Fringe Fluff & Magnificent Plumed Tail Fan
        this.tailSegments = [];
        for (let t = 0; t < 12; t++) {
            const segGroup = new THREE.Group();
            const r1 = Math.max(0.18, 0.90 - t * 0.058);
            const r2 = Math.max(0.15, 0.84 - t * 0.058);
            const segGeo = sculptGeometry(
                new THREE.CylinderGeometry(r2, r1, 1.08, 16, 3),
                (x, y, z) => {
                    const wave = Math.cos(Math.atan2(z, x) * 2.0) * 0.03;
                    return [x * (1.0 + wave), y, z * (0.94 - wave * 0.4)];
                }
            );
            segGeo.rotateX(Math.PI / 2);
            const segMesh = new THREE.Mesh(segGeo, pearlFurMat);
            segGroup.add(segMesh);

            if (t < 10) {
                const belly = new THREE.Mesh(new THREE.BoxGeometry(r1 * 1.16, 0.14, 0.80), bellyScuteMat);
                belly.position.set(0, -r1 * 0.78, 0);
                segGroup.add(belly);
            }

            // Dorsal Spine Fur Lock + Twin Lateral Feather Fringes
            const dorsalFur = new THREE.Mesh(new THREE.ConeGeometry(Math.max(0.10, 0.22 - t * 0.01), 0.64, 8), maneFurMat);
            dorsalFur.position.set(0, r1 * 0.86, 0);
            dorsalFur.rotation.x = -0.56;
            segGroup.add(dorsalFur);

            [-1, 1].forEach((side) => {
                const latFringe = new THREE.Mesh(new THREE.ConeGeometry(Math.max(0.07, 0.14 - t * 0.007), 0.48, 7), pearlFurMat);
                latFringe.position.set(side * r1 * 0.88, -0.04, 0.08);
                latFringe.rotation.z = -side * 1.15;
                latFringe.rotation.x = 0.62;
                segGroup.add(latFringe);
            });

            if (t === 11) {
                // Magnificent Multi-Plume Lion-Cloud Luckdragon Tail Fan
                const tailPlume = new THREE.Mesh(new THREE.SphereGeometry(0.54, 16, 14), maneFurMat);
                tailPlume.scale.set(0.92, 0.78, 2.35);
                tailPlume.position.set(0, 0, 0.98);
                segGroup.add(tailPlume);

                for (let tp = -3; tp <= 3; tp++) {
                    const fanFeather = new THREE.Mesh(
                        new THREE.ConeGeometry(0.18 - Math.abs(tp) * 0.018, 1.35 - Math.abs(tp) * 0.10, 8),
                        tp % 2 === 0 ? maneFurMat : pinkPearlFurMat
                    );
                    fanFeather.position.set(tp * 0.18, Math.cos(tp * 0.5) * 0.08, 1.35 + (3 - Math.abs(tp)) * 0.14);
                    fanFeather.rotation.x = 1.48;
                    fanFeather.rotation.z = -tp * 0.22;
                    segGroup.add(fanFeather);
                }
            }

            segGroup.position.set(0, -0.03 * t, 2.85 + t * 0.82);
            this.dragonGroup.add(segGroup);
            this.tailSegments.push(segGroup);
        }

        this.avatarAnimParts = { leftEar, rightEar, forelegs, hindlegs, whiskerTendrils };
        this.dragonGroup.position.set(0, this.dragonCurrentY, 0);
        this.scene.add(this.dragonGroup);
    },

    /**
     * Procedural leathery, wrinkled golden-russet & warm terracotta skin texture for E.T.
     */
    createETWrinkledSkinTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        baseGrad.addColorStop(0.0, '#9a5b25');
        baseGrad.addColorStop(0.45, '#b4692c');
        baseGrad.addColorStop(0.78, '#854d1e');
        baseGrad.addColorStop(1.0, '#6c3b14');
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Organic mottled terracotta/amber skin blotches
        for (let i = 0; i < 240; i++) {
            const x = (Math.sin(i * 91.3 + 17.1) * 0.5 + 0.5) * canvas.width;
            const y = (Math.cos(i * 137.9 + 53.4) * 0.5 + 0.5) * canvas.height;
            const rad = 10 + (i % 24);
            const g = ctx.createRadialGradient(x, y, 2, x, y, rad);
            g.addColorStop(0, i % 2 === 0 ? 'rgba(217, 130, 68, 0.24)' : 'rgba(72, 36, 12, 0.22)');
            g.addColorStop(1, 'rgba(146, 84, 34, 0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, rad, 0, Math.PI * 2);
            ctx.fill();
        }

        // Deep horizontal forehead & neck skin wrinkle creases with highlight ridges
        for (let row = 0; row < 38; row++) {
            const y0 = (row / 38) * canvas.height;
            const amp = 4 + (row % 5) * 1.5;
            ctx.strokeStyle = 'rgba(54, 25, 8, 0.55)';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += 16) {
                const wy = y0 + Math.sin(x * 0.035 + row * 1.3) * amp;
                if (x === 0) ctx.moveTo(x, wy);
                else ctx.lineTo(x, wy);
            }
            ctx.stroke();

            ctx.strokeStyle = 'rgba(235, 168, 108, 0.28)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += 16) {
                const wy = y0 + 2.2 + Math.sin(x * 0.035 + row * 1.3) * amp;
                if (x === 0) ctx.moveTo(x, wy);
                else ctx.lineTo(x, wy);
            }
            ctx.stroke();
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1.5, 1.5);
        return tex;
    },

    /**
     * Updates the BMX crankset, horizontal pedals, and 2-bone inverse kinematics (thigh, knee, shin, ankle)
     * for Elliott's legs so the sneakers stay planted on the pedals throughout the 360-degree pedal stroke.
     */
    updateEtBikePedaling(crankAngle = 0) {
        const parts = this.avatarAnimParts;
        if (!parts || !parts.crankPivot || !parts.leftLeg || !parts.rightLeg) return;

        parts.crankPivot.rotation.x = crankAngle;
        if (parts.leftPedal) {
            parts.leftPedal.rotation.x = -crankAngle;
        }
        if (parts.rightPedal) {
            parts.rightPedal.rotation.x = -crankAngle;
        }

        const bbY = typeof parts.bbY === 'number' ? parts.bbY : -0.95;
        const bbZ = typeof parts.bbZ === 'number' ? parts.bbZ : 0.25;
        const crankRadius = typeof parts.crankRadius === 'number' ? parts.crankRadius : 0.34;

        const solveLegIK = (leg) => {
            const theta = crankAngle + leg.armPhase;
            // Pedal spindle world position in bikeRoot space as crankPivot rotates around X
            const pedalY = bbY + crankRadius * Math.cos(theta);
            const pedalZ = bbZ + crankRadius * Math.sin(theta);

            // Target ankle position directly above the pedal platform
            const ankleY = pedalY + 0.085;
            const ankleZ = pedalZ + 0.04;

            const dy = ankleY - leg.hipY;
            const dz = ankleZ - leg.hipZ;
            const L1 = leg.thighLength;
            const L2 = leg.shinLength;
            const rawDist = Math.hypot(dy, dz);
            const dist = Math.min(L1 + L2 - 0.005, Math.max(Math.abs(L1 - L2) + 0.005, rawDist));

            // Angle measured from straight down (-Y) toward forward (-Z), where +rotation.x swings -Y toward -Z
            const phiTarget = Math.atan2(-dz, -dy);
            const cosHip = Math.max(-1, Math.min(1, (L1 * L1 + dist * dist - L2 * L2) / (2 * L1 * dist)));
            const cosKnee = Math.max(-1, Math.min(1, (L1 * L1 + L2 * L2 - dist * dist) / (2 * L1 * L2)));

            const thighAngle = phiTarget + Math.acos(cosHip);
            const shinAngle = -(Math.PI - Math.acos(cosKnee));

            leg.legGroup.rotation.x = thighAngle;
            leg.shinGroup.rotation.x = shinAngle;
            if (leg.footGroup) {
                const ankleRock = Math.sin(theta) * 0.14;
                leg.footGroup.rotation.x = -(thighAngle + shinAngle) + ankleRock;
            }
        };

        solveLegIK(parts.leftLeg);
        solveLegIK(parts.rightLeg);
    },

    /**
     * Builds the Boy with Bicycle & E.T. (Elliott in red hoodie pedaling a classic 1980s BMX bicycle
     * across the sky with the iconic E.T. film character wrapped in a white blanket inside the front
     * wicker basket, featuring his bi-lobed wrinkled cranium, soulful sky-blue eyes with heavy eyelids,
     * telescoping ridged neck, glowing red Heart-Light chest, and glowing healing fingertip).
     */
    buildBoyWithBicycleAndET() {
        this.dragonGroup = new THREE.Group();

        // Helper to organically sculpt sphere/cylinder/box vertices and recompute smooth normals
        const sculptGeometry = (geo, deformFn) => {
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const vx = pos.getX(i);
                const vy = pos.getY(i);
                const vz = pos.getZ(i);
                const [nx, ny, nz] = deformFn(vx, vy, vz);
                pos.setXYZ(i, nx, ny, nz);
            }
            pos.needsUpdate = true;
            geo.computeVertexNormals();
            return geo;
        };

        // Procedural wicker basket & E.T. leathery skin textures
        const wickerCanvas = document.createElement('canvas');
        wickerCanvas.width = 256;
        wickerCanvas.height = 256;
        const wCtx = wickerCanvas.getContext('2d');
        wCtx.fillStyle = '#b45309';
        wCtx.fillRect(0, 0, 256, 256);
        for (let y = 0; y < 256; y += 16) {
            for (let x = 0; x < 256; x += 32) {
                wCtx.fillStyle = ((x + y) % 32 === 0) ? '#d97706' : '#92400e';
                wCtx.fillRect(x, y, 28, 12);
            }
        }
        const wickerTex = new THREE.CanvasTexture(wickerCanvas);
        wickerTex.wrapS = THREE.RepeatWrapping;
        wickerTex.wrapT = THREE.RepeatWrapping;
        wickerTex.repeat.set(2, 2);

        const etSkinTex = (this.createETWrinkledSkinTexture || window.Performed3DAvatarModels.createETWrinkledSkinTexture).call(this);

        const frameRedMat = new THREE.MeshPhongMaterial({
            color: 0xdc2626,
            emissive: 0x3b0707,
            specular: 0xffffff,
            shininess: 135
        });
        const chromeMat = new THREE.MeshPhongMaterial({
            color: 0xe2e8f0,
            specular: 0xffffff,
            shininess: 160
        });
        const darkMetalMat = new THREE.MeshPhongMaterial({
            color: 0x334155,
            specular: 0x94a3b8,
            shininess: 95
        });
        const tireMat = new THREE.MeshPhongMaterial({
            color: 0x1e293b,
            specular: 0x475569,
            shininess: 35
        });
        const reflectorMat = new THREE.MeshPhongMaterial({
            color: 0xf59e0b,
            emissive: 0xd97706,
            emissiveIntensity: 0.65,
            specular: 0xffffff,
            shininess: 140
        });
        const hoodieRedMat = new THREE.MeshPhongMaterial({
            color: 0xef4444,
            emissive: 0x450a0a,
            specular: 0xfca5a5,
            shininess: 42
        });
        const jeansMat = new THREE.MeshPhongMaterial({
            color: 0x1d4ed8,
            emissive: 0x0f172a,
            specular: 0x60a5fa,
            shininess: 35
        });
        const skinMat = new THREE.MeshPhongMaterial({
            color: 0xfdba74,
            emissive: 0x431407,
            specular: 0xffedd5,
            shininess: 45
        });
        const etSkinMat = new THREE.MeshPhongMaterial({
            color: 0xb4692c,
            map: etSkinTex,
            bumpMap: etSkinTex,
            bumpScale: 0.048,
            emissive: 0x2d1606,
            specular: 0xfde68a,
            shininess: 48
        });
        const etDarkCreaseMat = new THREE.MeshPhongMaterial({
            color: 0x5c2d0c,
            map: etSkinTex,
            bumpMap: etSkinTex,
            bumpScale: 0.035,
            emissive: 0x1f0d02,
            specular: 0x9a5b25,
            shininess: 32
        });
        const blanketMat = new THREE.MeshPhongMaterial({
            color: 0xf8fafc,
            emissive: 0x1e293b,
            specular: 0xffffff,
            shininess: 30,
            side: THREE.DoubleSide
        });
        const basketMat = new THREE.MeshPhongMaterial({
            color: 0xd97706,
            map: wickerTex,
            bumpMap: wickerTex,
            bumpScale: 0.06,
            shininess: 40
        });

        const bikeRoot = new THREE.Group();
        bikeRoot.scale.set(1.38, 1.38, 1.38);
        this.dragonGroup.add(bikeRoot);

        // Helper to connect two 3D points with a cylindrical frame tube
        const addTube = (parent, p1, p2, r, mat) => {
            const v1 = new THREE.Vector3(...p1);
            const v2 = new THREE.Vector3(...p2);
            const dir = new THREE.Vector3().subVectors(v2, v1);
            const len = dir.length();
            const geo = new THREE.CylinderGeometry(r, r, len, 12);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(v1).add(v2).multiplyScalar(0.5);
            mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
            parent.add(mesh);
            return mesh;
        };

        // Front & Rear Spoked BMX Wheels (centered around X=0, oriented along Z)
        const buildSpokedWheel = (zPos) => {
            const wheelGroup = new THREE.Group();
            wheelGroup.position.set(0, -1.05, zPos);

            const tire = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.14, 14, 32), tireMat);
            tire.rotation.y = Math.PI / 2;
            wheelGroup.add(tire);

            const rim = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.045, 10, 28), chromeMat);
            rim.rotation.y = Math.PI / 2;
            wheelGroup.add(rim);

            const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.28, 12), chromeMat);
            hub.rotation.z = Math.PI / 2;
            wheelGroup.add(hub);

            for (let s = 0; s < 12; s++) {
                const angle = (s / 12) * Math.PI * 2;
                const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.54, 6), chromeMat);
                spoke.rotation.x = angle;
                wheelGroup.add(spoke);
            }

            // Classic amber wheel spoke reflector
            const wheelReflector = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.09, 0.18), reflectorMat);
            wheelReflector.position.set(0, 0.52, 0);
            wheelGroup.add(wheelReflector);

            bikeRoot.add(wheelGroup);
            return wheelGroup;
        };

        const frontWheel = buildSpokedWheel(-1.85);
        const rearWheel = buildSpokedWheel(1.75);

        // Classic Diamond BMX Frame, Fork, Handlebars & Saddle
        const bbY = -0.95;
        const bbZ = 0.25;
        const bbPos = [0, bbY, bbZ];
        const seatTop = [0, 0.22, 0.72];
        const headTop = [0, 0.35, -1.35];
        const headBot = [0, -0.15, -1.50];
        const rearAxleL = [-0.16, -1.05, 1.75];
        const rearAxleR = [0.16, -1.05, 1.75];
        const frontAxleL = [-0.16, -1.05, -1.85];
        const frontAxleR = [0.16, -1.05, -1.85];

        addTube(bikeRoot, bbPos, seatTop, 0.075, frameRedMat);
        addTube(bikeRoot, bbPos, headBot, 0.08, frameRedMat);
        addTube(bikeRoot, seatTop, headTop, 0.075, frameRedMat);
        addTube(bikeRoot, headBot, headTop, 0.085, frameRedMat);
        addTube(bikeRoot, bbPos, rearAxleL, 0.05, frameRedMat);
        addTube(bikeRoot, bbPos, rearAxleR, 0.05, frameRedMat);
        addTube(bikeRoot, seatTop, rearAxleL, 0.048, frameRedMat);
        addTube(bikeRoot, seatTop, rearAxleR, 0.048, frameRedMat);
        addTube(bikeRoot, headBot, frontAxleL, 0.055, chromeMat);
        addTube(bikeRoot, headBot, frontAxleR, 0.055, chromeMat);

        // Chrome seatpost connecting frame to saddle
        addTube(bikeRoot, seatTop, [0, 0.36, 0.76], 0.048, chromeMat);

        // BMX Rise Handlebars & Grips
        addTube(bikeRoot, headTop, [-0.58, 0.92, -1.32], 0.045, chromeMat);
        addTube(bikeRoot, headTop, [0.58, 0.92, -1.32], 0.045, chromeMat);
        addTube(bikeRoot, [-0.42, 0.75, -1.32], [0.42, 0.75, -1.32], 0.035, chromeMat);
        [-1, 1].forEach((side) => {
            const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.34, 10), tireMat);
            grip.rotation.z = Math.PI / 2;
            grip.position.set(side * 0.72, 0.92, -1.32);
            bikeRoot.add(grip);
        });

        // Saddle
        const saddle = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), tireMat);
        saddle.scale.set(0.75, 0.38, 1.45);
        saddle.position.set(0, 0.38, 0.78);
        bikeRoot.add(saddle);

        // Front Wicker Basket & Iconic Film Character E.T. Wrapped in White Blanket
        const basketGroup = new THREE.Group();
        basketGroup.position.set(0, 0.42, -1.88);
        const basketMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.46, 0.78, 18), basketMat);
        basketMesh.scale.set(1.15, 1.0, 0.88);
        basketGroup.add(basketMesh);

        // Woven Top Rim & Handlebar Leather Straps on the Wicker Basket
        const basketRim = new THREE.Mesh(new THREE.TorusGeometry(0.61, 0.055, 10, 24), basketMat);
        basketRim.rotation.x = Math.PI / 2;
        basketRim.scale.set(1.15, 0.88, 1.0);
        basketRim.position.set(0, 0.39, 0);
        basketGroup.add(basketRim);

        [-0.32, 0.32].forEach((sx) => {
            addTube(basketGroup, [sx, 0.32, 0.44], [sx, 0.48, 0.56], 0.032, etDarkCreaseMat);
        });

        // Draped White Blanket Body & Folded Collar Inside the Basket (open in front for E.T.'s chest & Heart-Light)
        const blanketShroud = new THREE.Mesh(new THREE.SphereGeometry(0.52, 18, 14), blanketMat);
        blanketShroud.scale.set(1.12, 0.98, 0.86);
        blanketShroud.position.set(0, 0.34, 0.06);
        basketGroup.add(blanketShroud);

        // Left & Right Blanket Lapels / Shawl Folds framing E.T.'s chest
        [-1, 1].forEach((side) => {
            const shawlFold = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.16, 0.66, 12), blanketMat);
            shawlFold.position.set(side * 0.34, 0.48, -0.22);
            shawlFold.rotation.z = side * 0.28;
            shawlFold.rotation.x = 0.22;
            basketGroup.add(shawlFold);
        });

        // E.T.'s Ribbed Upper Chest & Warmly Glowing Red-Amber Heart-Light visible through the open blanket front
        const etChest = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), etSkinMat);
        etChest.scale.set(1.05, 1.12, 0.78);
        etChest.position.set(0, 0.42, -0.18);
        basketGroup.add(etChest);

        for (let r = 0; r < 3; r++) {
            const ribArc = new THREE.Mesh(new THREE.TorusGeometry(0.24 - r * 0.02, 0.024, 8, 14, Math.PI * 0.75), etSkinMat);
            ribArc.position.set(0, 0.48 - r * 0.08, -0.22);
            ribArc.rotation.x = Math.PI / 2;
            ribArc.rotation.z = -Math.PI * 0.875;
            basketGroup.add(ribArc);
        }

        const heartLightMat = new THREE.MeshPhongMaterial({
            color: 0xff3b1f,
            emissive: 0xef4444,
            emissiveIntensity: 0.95,
            specular: 0xffffff,
            shininess: 120
        });
        const heartLightMesh = new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 12), heartLightMat);
        heartLightMesh.scale.set(0.95, 1.15, 0.65);
        heartLightMesh.position.set(0.05, 0.44, -0.42);
        basketGroup.add(heartLightMesh);

        // E.T.'s Iconic Telescoping Ringed Neck rising from his shoulders to his wide head
        const etNeckGroup = new THREE.Group();
        etNeckGroup.position.set(0, 0.64, -0.10);
        const neckCore = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.19, 0.34, 14), etSkinMat);
        neckCore.position.set(0, 0.08, 0);
        etNeckGroup.add(neckCore);

        for (let nr = 0; nr < 4; nr++) {
            const neckRing = new THREE.Mesh(new THREE.TorusGeometry(0.165 - nr * 0.008, 0.036, 10, 18), etSkinMat);
            neckRing.rotation.x = Math.PI / 2;
            neckRing.scale.set(1.08, 0.92, 1.0);
            neckRing.position.set(0, -0.03 + nr * 0.072, -0.01 * nr);
            etNeckGroup.add(neckRing);
        }
        basketGroup.add(etNeckGroup);

        // E.T. Head Group (Carlo Rambaldi's wide flattened bi-lobed cranium, heavy eyelids, soulful sky-blue eyes, pug nose & gentle smile)
        const etHeadGroup = new THREE.Group();
        etHeadGroup.position.set(0, 0.94, -0.14);
        etHeadGroup.userData.baseY = 0.94;

        // Open Draped White Blanket Hood Cowl framing the back, top-rear & sides of E.T.'s head without covering his face
        const etHoodBack = sculptGeometry(new THREE.SphereGeometry(0.49, 20, 16), (x, y, z) => {
            // Carve open the front (-Z) so E.T.'s face is completely unobstructed
            const frontCut = z < -0.05 ? 0.15 : 1.0;
            const flareX = 1.26 + (y < 0 ? 0.14 : 0);
            const drapeY = y < -0.1 ? y * 1.18 : y * 0.96;
            return [x * flareX, drapeY, z < -0.05 ? -0.05 + (z + 0.05) * frontCut : z * 1.08 + 0.12];
        });
        const etHoodMesh = new THREE.Mesh(etHoodBack, blanketMat);
        etHoodMesh.position.set(0, 0.01, 0.08);
        etHeadGroup.add(etHoodMesh);

        // Hood Cowl Arch Rim framing E.T.'s wide forehead and cheeks
        const hoodCowlRim = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.068, 12, 24, Math.PI * 1.28), blanketMat);
        hoodCowlRim.scale.set(1.24, 0.88, 1.0);
        hoodCowlRim.rotation.z = -Math.PI * 0.14;
        hoodCowlRim.position.set(0, -0.02, -0.02);
        etHeadGroup.add(hoodCowlRim);

        // E.T.'s Sculpted Bi-Lobed (Heart/Peanut-Shaped) Cranium with Central Sagittal Furrow & Wide Cheekbones
        const etCraniumGeo = sculptGeometry(new THREE.SphereGeometry(0.38, 24, 20), (x, y, z) => {
            const nx = x / 0.38;
            const ny = y / 0.38;
            const nz = z / 0.38;
            // Bi-lobed widening at the temples and slight dip along the top midline (nx ~ 0)
            const templeBulge = 1.38 + (ny > -0.15 ? 0.18 * Math.sin(Math.min(1, Math.abs(nx)) * Math.PI * 0.5) : -0.10);
            const sagittalDip = (ny > 0.25 && Math.abs(nx) < 0.45) ? -0.042 * Math.cos(nx * Math.PI) : 0;
            // Taper down toward the chin while pushing the muzzle/snout slightly forward
            const jawNarrow = ny < -0.2 ? (1.0 - Math.min(0.32, (-ny - 0.2) * 0.38)) : 1.0;
            const muzzleProtrude = (nz < -0.25 && ny < 0.05 && ny > -0.65) ? -0.055 : 0;
            return [
                x * templeBulge * jawNarrow,
                y * 0.82 + sagittalDip,
                z * 0.96 + muzzleProtrude
            ];
        });
        const etCranium = new THREE.Mesh(etCraniumGeo, etSkinMat);
        etCranium.position.set(0, 0.03, -0.08);
        etHeadGroup.add(etCranium);

        // Prominent Furrowed Forehead Wrinkle Creases across E.T.'s Upper Brow
        for (let fw = 0; fw < 3; fw++) {
            const wrinkleArc = new THREE.Mesh(
                new THREE.TorusGeometry(0.28 - fw * 0.025, 0.016, 8, 18, Math.PI * 0.68),
                fw % 2 === 0 ? etDarkCreaseMat : etSkinMat
            );
            wrinkleArc.scale.set(1.35, 0.35, 0.85);
            wrinkleArc.position.set(0, 0.21 - fw * 0.038, -0.37 - fw * 0.01);
            wrinkleArc.rotation.x = 0.28;
            wrinkleArc.rotation.z = Math.PI * 0.16;
            etHeadGroup.add(wrinkleArc);
        }

        // Soulful Wide-Set Sky-Blue E.T. Eyes with Milky Sclera, Heavy Drooping Eyelids & Specular Catchlights
        const scleraMat = new THREE.MeshPhongMaterial({
            color: 0xfef3c7,
            emissive: 0x291d0a,
            specular: 0xffffff,
            shininess: 110
        });
        const etIrisOuterMat = new THREE.MeshPhongMaterial({
            color: 0x0284c7,
            emissive: 0x0369a1,
            emissiveIntensity: 0.42,
            specular: 0xffffff,
            shininess: 145
        });
        const etIrisInnerMat = new THREE.MeshPhongMaterial({
            color: 0x38bdf8,
            emissive: 0x0284c7,
            emissiveIntensity: 0.55,
            specular: 0xffffff,
            shininess: 160
        });
        const pupilMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
        const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

        [-1, 1].forEach((side) => {
            const ex = side * 0.21;
            const ey = 0.05;
            const ez = -0.35;

            // Heavy Arched Supraorbital Brow Ridge
            const browRidge = new THREE.Mesh(new THREE.TorusGeometry(0.135, 0.034, 10, 16, Math.PI * 0.92), etSkinMat);
            browRidge.scale.set(1.22, 0.82, 1.0);
            browRidge.position.set(ex, ey + 0.065, ez - 0.02);
            browRidge.rotation.z = -side * 0.22;
            browRidge.rotation.y = -side * 0.18;
            etHeadGroup.add(browRidge);

            // Milky-Ivory Sclera Eyeball
            const eyeball = new THREE.Mesh(new THREE.SphereGeometry(0.112, 16, 16), scleraMat);
            eyeball.scale.set(1.08, 0.96, 0.92);
            eyeball.position.set(ex, ey, ez);
            etHeadGroup.add(eyeball);

            // Deep Cerulean Outer Iris Ring & Luminous Sky-Blue Inner Iris
            const irisOuter = new THREE.Mesh(new THREE.SphereGeometry(0.078, 14, 14), etIrisOuterMat);
            irisOuter.scale.set(1.0, 1.0, 0.55);
            irisOuter.position.set(ex * 0.98, ey, ez - 0.072);
            etHeadGroup.add(irisOuter);

            const irisInner = new THREE.Mesh(new THREE.SphereGeometry(0.064, 12, 12), etIrisInnerMat);
            irisInner.scale.set(1.0, 1.0, 0.52);
            irisInner.position.set(ex * 0.98, ey, ez - 0.084);
            etHeadGroup.add(irisInner);

            // Large Dilated Dark Pupil
            const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.042, 10, 10), pupilMat);
            pupil.scale.set(1.0, 1.0, 0.45);
            pupil.position.set(ex * 0.97, ey, ez - 0.098);
            etHeadGroup.add(pupil);

            // Dual Specular Eye Catchlights (gives E.T. his gentle, soulful cinematic expression)
            const catchlight1 = new THREE.Mesh(new THREE.SphereGeometry(0.019, 8, 8), catchlightMat);
            catchlight1.position.set(ex - 0.024, ey + 0.026, ez - 0.115);
            etHeadGroup.add(catchlight1);

            const catchlight2 = new THREE.Mesh(new THREE.SphereGeometry(0.010, 6, 6), catchlightMat);
            catchlight2.position.set(ex + 0.022, ey - 0.018, ez - 0.112);
            etHeadGroup.add(catchlight2);

            // Characteristic Heavy Wrinkled Upper Eyelid Hood (angled gently down toward the outer temples)
            const upperEyelid = new THREE.Mesh(
                new THREE.SphereGeometry(0.122, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.54),
                etSkinMat
            );
            upperEyelid.scale.set(1.12, 0.96, 1.02);
            upperEyelid.position.set(ex, ey + 0.008, ez);
            upperEyelid.rotation.x = -0.32;
            upperEyelid.rotation.z = -side * 0.20;
            etHeadGroup.add(upperEyelid);

            // Pouchy Wrinkled Lower Eyelid Bag
            const lowerEyelid = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.025, 8, 14, Math.PI * 0.85), etSkinMat);
            lowerEyelid.scale.set(1.14, 0.68, 0.95);
            lowerEyelid.position.set(ex, ey - 0.032, ez - 0.035);
            lowerEyelid.rotation.z = Math.PI + side * 0.12;
            etHeadGroup.add(lowerEyelid);

            // Full Sculpted Cheek Pouches beneath the Eyes
            const cheekPouch = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), etSkinMat);
            cheekPouch.scale.set(1.18, 0.78, 0.88);
            cheekPouch.position.set(side * 0.23, -0.08, -0.32);
            etHeadGroup.add(cheekPouch);
        });

        // E.T.'s Short, Flat Upturned Pug Nose Bridge & Indented Dark Nostrils
        const noseBridge = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 10), etSkinMat);
        noseBridge.scale.set(1.18, 0.72, 0.85);
        noseBridge.position.set(0, -0.02, -0.43);
        etHeadGroup.add(noseBridge);

        [-0.034, 0.034].forEach((nx) => {
            const nostril = new THREE.Mesh(new THREE.SphereGeometry(0.020, 8, 8), etDarkCreaseMat);
            nostril.scale.set(0.85, 1.25, 0.7);
            nostril.position.set(nx, -0.032, -0.495);
            etHeadGroup.add(nostril);
        });

        // Wide Muzzle Upper Lip, Gentle Upturned Mouth Smile Crease & Wrinkled Chin
        const upperMuzzle = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 10), etSkinMat);
        upperMuzzle.scale.set(1.42, 0.56, 0.86);
        upperMuzzle.position.set(0, -0.10, -0.35);
        etHeadGroup.add(upperMuzzle);

        const mouthCrease = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.015, 8, 18, Math.PI * 0.78), etDarkCreaseMat);
        mouthCrease.scale.set(1.22, 0.42, 0.75);
        mouthCrease.position.set(0, -0.115, -0.38);
        mouthCrease.rotation.x = 0.25;
        mouthCrease.rotation.z = Math.PI + Math.PI * 0.11;
        etHeadGroup.add(mouthCrease);

        const lowerChin = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10), etSkinMat);
        lowerChin.scale.set(1.28, 0.58, 0.84);
        lowerChin.position.set(0, -0.175, -0.33);
        etHeadGroup.add(lowerChin);

        // E.T.'s Left Four-Fingered Hand Gripping the Front Wicker Basket Rim
        const leftPalm = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 10), etSkinMat);
        leftPalm.scale.set(1.15, 0.65, 1.1);
        leftPalm.position.set(-0.34, -0.48, -0.36);
        etHeadGroup.add(leftPalm);
        for (let lf = 0; lf < 4; lf++) {
            const fx = -0.40 + lf * 0.038;
            addTube(etHeadGroup, [fx, -0.48, -0.36], [fx, -0.53, -0.47], 0.016, etSkinMat);
            const tip = new THREE.Mesh(new THREE.SphereGeometry(0.021, 8, 8), etSkinMat);
            tip.position.set(fx, -0.54, -0.48);
            etHeadGroup.add(tip);
        }

        // E.T.'s Outstretched Right Arm, Four-Fingered Hand & Iconic Glowing Red-Amber Healing Index Fingertip
        addTube(etHeadGroup, [0.24, -0.36, -0.12], [0.40, -0.18, -0.42], 0.048, etSkinMat);
        const rightPalm = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 10), etSkinMat);
        rightPalm.scale.set(1.05, 0.75, 1.15);
        rightPalm.position.set(0.41, -0.16, -0.45);
        etHeadGroup.add(rightPalm);

        // Three curled companion fingers + thumb on E.T.'s right hand
        for (let rf = 0; rf < 3; rf++) {
            const fy = -0.18 - rf * 0.028;
            addTube(etHeadGroup, [0.43, fy, -0.46], [0.48, fy - 0.02, -0.56], 0.015, etSkinMat);
        }
        // Extra-long articulated E.T. index finger with knuckle joint & glowing healing fingertip
        addTube(etHeadGroup, [0.42, -0.14, -0.46], [0.49, -0.05, -0.66], 0.020, etSkinMat);
        const knuckleJoint = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), etSkinMat);
        knuckleJoint.position.set(0.46, -0.09, -0.57);
        etHeadGroup.add(knuckleJoint);

        const fingerTipGlowMat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
        const glowingFingerTip = new THREE.Mesh(new THREE.SphereGeometry(0.072, 14, 14), fingerTipGlowMat);
        glowingFingerTip.position.set(0.51, -0.02, -0.71);
        etHeadGroup.add(glowingFingerTip);

        const fingerHaloMat = new THREE.MeshBasicMaterial({
            color: 0xfbbf24,
            transparent: true,
            opacity: 0.42
        });
        const fingerGlowHalo = new THREE.Mesh(new THREE.SphereGeometry(0.125, 14, 14), fingerHaloMat);
        glowingFingerTip.add(fingerGlowHalo);

        basketGroup.add(etHeadGroup);
        bikeRoot.add(basketGroup);
        this.dragonHeadGroup = etHeadGroup;

        // Complete BMX Drivetrain: Bottom Bracket, Chainring, Rear Cog, Drive Chain, Crank Arms & Horizontal Pedals
        const crankRadius = 0.34;
        const crankPivot = new THREE.Group();
        crankPivot.position.set(0, bbY, bbZ);

        // Bottom bracket axle spindle
        const bbSpindle = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.38, 12), chromeMat);
        bbSpindle.rotation.z = Math.PI / 2;
        crankPivot.add(bbSpindle);

        // Right-side chrome chainring & inner spider spokes
        const chainring = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.035, 24), chromeMat);
        chainring.rotation.z = Math.PI / 2;
        chainring.position.x = 0.13;
        crankPivot.add(chainring);

        const chainringRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.025, 8, 24), darkMetalMat);
        chainringRing.rotation.y = Math.PI / 2;
        chainringRing.position.x = 0.135;
        crankPivot.add(chainringRing);

        // Rear sprocket cog & upper/lower bicycle drive chain runs
        const rearCog = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.03, 16), darkMetalMat);
        rearCog.rotation.z = Math.PI / 2;
        rearCog.position.set(0.13, -1.05, 1.75);
        bikeRoot.add(rearCog);
        addTube(bikeRoot, [0.135, bbY + 0.25, bbZ], [0.135, -1.05 + 0.12, 1.75], 0.018, darkMetalMat);
        addTube(bikeRoot, [0.135, bbY - 0.25, bbZ], [0.135, -1.05 - 0.12, 1.75], 0.018, darkMetalMat);

        // Helper to build a crank arm + counter-rotating BMX platform pedal with amber reflectors
        const buildCrankArmAndPedal = (side, armPhase) => {
            const armX = side * 0.16;
            const tipY = crankRadius * Math.cos(armPhase);
            const tipZ = crankRadius * Math.sin(armPhase);

            // Chrome crank arm from bottom bracket to pedal spindle
            addTube(crankPivot, [armX, 0, 0], [armX, tipY, tipZ], 0.032, chromeMat);

            const crankBoss = new THREE.Mesh(new THREE.SphereGeometry(0.042, 10, 10), chromeMat);
            crankBoss.position.set(armX, tipY, tipZ);
            crankPivot.add(crankBoss);

            // Pedal group positioned at the crank arm tip; counter-rotates (-crankAngle) so pedal stays horizontal
            const pedalGroup = new THREE.Group();
            pedalGroup.position.set(side * 0.24, tipY, tipZ);

            // Chrome spindle connecting crank arm tip to pedal body
            const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 8), chromeMat);
            spindle.rotation.z = Math.PI / 2;
            spindle.position.set(-side * 0.04, 0, 0);
            pedalGroup.add(spindle);

            // Serrated BMX platform pedal body
            const pedalBody = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.048, 0.24), darkMetalMat);
            pedalGroup.add(pedalBody);

            const pedalCage = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.054, 0.25), tireMat);
            pedalCage.scale.set(1.0, 0.75, 1.0);
            pedalGroup.add(pedalCage);

            // Front & back amber safety reflectors on each pedal
            [-0.122, 0.122].forEach((rz) => {
                const reflector = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.028, 0.014), reflectorMat);
                reflector.position.set(0, 0, rz);
                pedalGroup.add(reflector);
            });

            crankPivot.add(pedalGroup);
            return pedalGroup;
        };

        // Left crank arm at phase PI, Right crank arm at phase 0 (180 degrees apart)
        const leftPedal = buildCrankArmAndPedal(-1, Math.PI);
        const rightPedal = buildCrankArmAndPedal(1, 0);
        bikeRoot.add(crankPivot);

        // Boy Rider (Elliott in Iconic Red Hoodie & Blue Jeans)
        const riderTorso = new THREE.Group();
        riderTorso.position.set(0, 0.98, 0.42);
        riderTorso.rotation.x = -0.42;

        // Pelvis / Denim Hips seated on the BMX saddle
        const pelvis = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 12), jeansMat);
        pelvis.scale.set(1.05, 0.72, 0.92);
        pelvis.position.set(0, 0.44, 0.72);
        bikeRoot.add(pelvis);

        const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.30, 1.08, 14), hoodieRedMat);
        riderTorso.add(chest);

        // Hoodie Hood & Boy's Head with Cap/Hair
        const hoodBack = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 10), hoodieRedMat);
        hoodBack.position.set(0, 0.56, 0.16);
        riderTorso.add(hoodBack);

        const boyHead = new THREE.Mesh(new THREE.SphereGeometry(0.30, 16, 14), skinMat);
        boyHead.position.set(0, 0.78, -0.04);
        riderTorso.add(boyHead);

        const hairMat = new THREE.MeshPhongMaterial({ color: 0x451a03, shininess: 30 });
        const boyHair = new THREE.Mesh(new THREE.SphereGeometry(0.315, 14, 12), hairMat);
        boyHair.position.set(0, 0.85, 0.02);
        boyHair.scale.set(1.02, 0.88, 1.05);
        riderTorso.add(boyHair);

        bikeRoot.add(riderTorso);

        // Rider Arms reaching to BMX Handlebars
        [-1, 1].forEach((side) => {
            addTube(bikeRoot, [side * 0.36, 1.32, 0.15], [side * 0.54, 1.08, -0.62], 0.095, hoodieRedMat);
            addTube(bikeRoot, [side * 0.54, 1.08, -0.62], [side * 0.70, 0.92, -1.30], 0.08, hoodieRedMat);
            const hand = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 10), skinMat);
            hand.position.set(side * 0.70, 0.92, -1.32);
            bikeRoot.add(hand);
        });

        // Articulated Left & Right Legs with 2-Bone IK (Hip -> Thigh -> Knee -> Shin -> Ankle -> Sneaker on Pedal)
        const leftLegGroup = new THREE.Group();
        const rightLegGroup = new THREE.Group();
        const hipY = 0.40;
        const hipZ = 0.72;
        const thighLength = 0.90;
        const shinLength = 0.88;

        const buildRiderLeg = (legGroup, side, armPhase) => {
            legGroup.position.set(side * 0.24, hipY, hipZ);

            const hipJoint = new THREE.Mesh(new THREE.SphereGeometry(0.135, 12, 10), jeansMat);
            legGroup.add(hipJoint);

            // Thigh extends straight down along -Y in local space so IK rotation.x directly aims the knee
            const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.112, thighLength, 14), jeansMat);
            thigh.position.set(0, -thighLength * 0.5, 0);
            legGroup.add(thigh);

            const kneeJoint = new THREE.Mesh(new THREE.SphereGeometry(0.112, 12, 10), jeansMat);
            kneeJoint.position.set(0, -thighLength, 0);
            legGroup.add(kneeJoint);

            // Shin group pivots at the knee (0, -thighLength, 0)
            const shinGroup = new THREE.Group();
            shinGroup.position.set(0, -thighLength, 0);

            const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.108, 0.086, shinLength * 0.82, 14), jeansMat);
            shin.position.set(0, -shinLength * 0.41, 0);
            shinGroup.add(shin);

            // Rolled denim cuff & 1980s white athletic sock above the ankle
            const denimCuff = new THREE.Mesh(new THREE.TorusGeometry(0.092, 0.022, 8, 14), jeansMat);
            denimCuff.rotation.x = Math.PI / 2;
            denimCuff.position.set(0, -shinLength * 0.78, 0);
            shinGroup.add(denimCuff);

            const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.076, shinLength * 0.24, 12), blanketMat);
            sock.position.set(0, -shinLength * 0.88, 0);
            shinGroup.add(sock);

            // Foot group pivots at the ankle (0, -shinLength, 0) so the sneaker stays planted on the pedal
            const footGroup = new THREE.Group();
            footGroup.position.set(0, -shinLength, 0);

            const sneakerUpper = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.10, 0.34), blanketMat);
            sneakerUpper.position.set(0, -0.03, -0.06);
            footGroup.add(sneakerUpper);

            const sneakerStripe = new THREE.Mesh(new THREE.BoxGeometry(0.178, 0.032, 0.22), hoodieRedMat);
            sneakerStripe.position.set(0, -0.025, -0.05);
            footGroup.add(sneakerStripe);

            const sneakerSole = new THREE.Mesh(new THREE.BoxGeometry(0.185, 0.038, 0.36), tireMat);
            sneakerSole.position.set(0, -0.075, -0.06);
            footGroup.add(sneakerSole);

            shinGroup.add(footGroup);
            legGroup.add(shinGroup);
            bikeRoot.add(legGroup);
            return {
                legGroup,
                shinGroup,
                footGroup,
                hipY,
                hipZ,
                thighLength,
                shinLength,
                armPhase
            };
        };

        const leftLeg = buildRiderLeg(leftLegGroup, -1, Math.PI);
        const rightLeg = buildRiderLeg(rightLegGroup, 1, 0);

        this.avatarAnimParts = {
            frontWheel,
            rearWheel,
            crankPivot,
            leftPedal,
            rightPedal,
            bbY,
            bbZ,
            crankRadius,
            leftLeg,
            rightLeg,
            etHeadGroup,
            glowingFingerTip,
            heartLightMesh,
            riderTorso
        };

        // Initialize the crank, pedals, and legs in a natural mid-stroke pedaling pose
        this.updateEtBikePedaling(-0.45);

        this.dragonGroup.position.set(0, this.dragonCurrentY, 0);
        this.scene.add(this.dragonGroup);
    },

    /**
     * Procedural high-contrast brushed 304 stainless steel panel texture for the DeLorean DMC-12.
     * Features fine horizontal hairline grain, anisotropic metallic sheen, and subtle panel seam lines.
     */
    createDeLoreanBrushedSteelTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Anisotropic multi-stop metallic stainless steel gradient
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0.0, '#e2e8f0');
        grad.addColorStop(0.22, '#cbd5e1');
        grad.addColorStop(0.48, '#94a3b8');
        grad.addColorStop(0.72, '#f1f5f9');
        grad.addColorStop(1.0, '#cbd5e1');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Dense horizontal brushed stainless hairline grain
        for (let i = 0; i < 2400; i++) {
            const y = (i / 2400) * 512 + (Math.sin(i * 19.7) * 0.8);
            const alpha = 0.08 + (i % 5) * 0.028;
            ctx.strokeStyle = (i % 2 === 0)
                ? `rgba(255, 255, 255, ${alpha})`
                : `rgba(15, 23, 42, ${alpha * 0.85})`;
            ctx.lineWidth = (i % 7 === 0) ? 1.4 : 0.8;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(512, y);
            ctx.stroke();
        }

        // Subtle Giugiaro body panel seam lines and brushed specular bands
        [128, 256, 384].forEach((seamY) => {
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.32)';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(0, seamY);
            ctx.lineTo(512, seamY);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(0, seamY + 2);
            ctx.lineTo(512, seamY + 2);
            ctx.stroke();
        });

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.needsUpdate = true;
        return tex;
    },

    /**
     * Procedural iconic California "OUTATIME" license plate texture (with red 'CALIFORNIA' script,
     * blue/gold registration stickers, and bold blue 'OUTATIME' typography).
     */
    createOutatimeLicensePlateTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // Reflective white/cream California plate background with golden sunburst header band
        ctx.fillStyle = '#fefce8';
        ctx.fillRect(0, 0, 256, 128);

        // Outer dark border & mounting bolt holes
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 6;
        ctx.strokeRect(4, 4, 248, 120);

        // Golden-orange California sunset stripe along top
        const topGrad = ctx.createLinearGradient(0, 10, 0, 42);
        topGrad.addColorStop(0.0, '#f59e0b');
        topGrad.addColorStop(1.0, '#fef08a');
        ctx.fillStyle = topGrad;
        ctx.fillRect(10, 10, 236, 30);

        // Registration month/year corner tags
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(16, 14, 34, 18);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(206, 14, 34, 18);

        // Red "CALIFORNIA" header text
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold italic 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CALIFORNIA', 128, 33);

        // Bold navy-blue "OUTATIME" stamped characters
        ctx.fillStyle = '#1e3a8a';
        ctx.font = 'bold 38px monospace';
        ctx.fillText('OUTATIME', 128, 88);

        // Bottom "THE GOLDEN STATE" stripe
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('THE GOLDEN STATE', 128, 112);

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    },

    /**
     * Procedural Back to the Future Time Circuits 3-row LED display texture
     * (Red: DESTINATION TIME OCT 21 2015, Green: PRESENT TIME OCT 26 1985, Amber: LAST TIME DEPARTED NOV 05 1955).
     */
    createTimeCircuitsDisplayTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 192;
        const ctx = canvas.getContext('2d');

        // Dark brushed metal control box face
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 256, 192);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 6;
        ctx.strokeRect(3, 3, 250, 186);

        const rows = [
            { y: 14, label: 'DESTINATION TIME', text: 'OCT 21 2015 04:29', color: '#ef4444', bg: '#2a0808' },
            { y: 74, label: 'PRESENT TIME', text: 'OCT 26 1985 01:21', color: '#22c55e', bg: '#052e16' },
            { y: 134, label: 'LAST TIME DEPARTED', text: 'NOV 05 1955 06:00', color: '#f59e0b', bg: '#2e1a05' }
        ];

        rows.forEach((r) => {
            // Dymo-style embossed red/black label strip
            ctx.fillStyle = '#991b1b';
            ctx.fillRect(16, r.y, 224, 15);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(r.label, 128, r.y + 11);

            // Recessed 7-segment LED display window
            ctx.fillStyle = r.bg;
            ctx.fillRect(14, r.y + 17, 228, 30);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 2;
            ctx.strokeRect(14, r.y + 17, 228, 30);

            ctx.fillStyle = r.color;
            ctx.font = 'bold 19px monospace';
            ctx.fillText(r.text, 128, r.y + 39);
        });

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    },

    /**
     * Builds the DeLorean DMC-12 Time Machine from Back to the Future (Part II Hover Conversion).
     * Features sculpted Giugiaro stainless-steel wedge bodywork, creased hood with DMC grille, gull-wing
     * door seams & toll-booth windows, detailed cabin with Doc & Marty, glowing Y-shaped Flux Capacitor,
     * 3-row LED Time Circuits & 88 MPH speedometer, braided Flux Bands with glowing blue emitter blocks,
     * articulated gold-rimmed hover turbine wheels, twin polygonal nuclear exhaust vents, Mr. Fusion
     * Home Energy Reactor, and animated 1.21-gigawatt temporal plasma coils.
     */
    buildBackToTheFutureDeLorean() {
        this.dragonGroup = new THREE.Group();

        // Helper to organically sculpt sphere/cylinder/box vertices and recompute smooth normals
        const sculptGeometry = (geo, deformFn) => {
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const vx = pos.getX(i);
                const vy = pos.getY(i);
                const vz = pos.getZ(i);
                const [nx, ny, nz] = deformFn(vx, vy, vz);
                pos.setXYZ(i, nx, ny, nz);
            }
            pos.needsUpdate = true;
            geo.computeVertexNormals();
            return geo;
        };

        const addTube = (parent, p1, p2, r, mat) => {
            const v1 = new THREE.Vector3(...p1);
            const v2 = new THREE.Vector3(...p2);
            const dir = new THREE.Vector3().subVectors(v2, v1);
            const len = dir.length();
            const geo = new THREE.CylinderGeometry(r, r, len, 10);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(v1).add(v2).multiplyScalar(0.5);
            mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
            parent.add(mesh);
            return mesh;
        };

        const steelTex = (this.createDeLoreanBrushedSteelTexture || window.Performed3DAvatarModels.createDeLoreanBrushedSteelTexture).call(this);
        const plateTex = (this.createOutatimeLicensePlateTexture || window.Performed3DAvatarModels.createOutatimeLicensePlateTexture).call(this);
        const timeCircuitsTex = (this.createTimeCircuitsDisplayTexture || window.Performed3DAvatarModels.createTimeCircuitsDisplayTexture).call(this);

        const stainlessMat = new THREE.MeshPhongMaterial({
            color: 0xd8dee9,
            map: steelTex,
            bumpMap: steelTex,
            bumpScale: 0.032,
            specular: 0xffffff,
            shininess: 175
        });
        const chromeMat = new THREE.MeshPhongMaterial({
            color: 0xf8fafc,
            specular: 0xffffff,
            shininess: 200
        });
        const bumperTrimMat = new THREE.MeshPhongMaterial({
            color: 0x1e293b,
            specular: 0x64748b,
            shininess: 55
        });
        const darkChassisMat = new THREE.MeshPhongMaterial({
            color: 0x0f172a,
            specular: 0x334155,
            shininess: 40
        });
        const glassMat = new THREE.MeshPhongMaterial({
            color: 0x0f172a,
            emissive: 0x082f49,
            emissiveIntensity: 0.45,
            specular: 0xbae6fd,
            shininess: 195,
            transparent: true,
            opacity: 0.46
        });
        const copperCableMat = new THREE.MeshPhongMaterial({
            color: 0xd97706,
            emissive: 0x451a03,
            specular: 0xfde68a,
            shininess: 140
        });
        const redCableMat = new THREE.MeshPhongMaterial({
            color: 0xdc2626,
            emissive: 0x450a0a,
            specular: 0xfca5a5,
            shininess: 110
        });
        const goldRimMat = new THREE.MeshPhongMaterial({
            color: 0xfacc15,
            emissive: 0x422006,
            specular: 0xfef08a,
            shininess: 160
        });
        const fluxBandMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8
        });
        const thrusterGlowMat = new THREE.MeshBasicMaterial({
            color: 0x22d3ee,
            transparent: true,
            opacity: 0.92
        });
        const fluxCapacitorGlowMat = new THREE.MeshBasicMaterial({
            color: 0xfef08a
        });

        const carGroup = new THREE.Group();
        carGroup.scale.set(1.22, 1.22, 1.22);
        this.dragonGroup.add(carGroup);

        // 1. Sculpted Giugiaro Wedge Lower Body & Tapered Stainless-Steel Beltline
        const lowerBodyGeo = sculptGeometry(new THREE.BoxGeometry(3.42, 0.84, 7.28, 8, 4, 14), (x, y, z) => {
            // Iconic DMC-12 inward taper above and below the mid-body beltline rub strip
            const beltPinch = y > 0.08 ? 0.94 : (y < -0.15 ? 0.90 : 1.02);
            // Slight nose wedge slope toward the front fascia (-Z) and slight tail taper (+Z)
            const frontSlopeY = z < -1.6 ? (z + 1.6) * 0.075 : 0;
            const noseTaperX = z < -2.4 ? 1.0 - (-2.4 - z) * 0.035 : (z > 2.6 ? 1.0 - (z - 2.6) * 0.025 : 1.0);
            return [x * beltPinch * noseTaperX, y + frontSlopeY, z];
        });
        const lowerBody = new THREE.Mesh(lowerBodyGeo, stainlessMat);
        lowerBody.position.set(0, -0.18, 0);
        carGroup.add(lowerBody);

        // Underbody aerodynamic dark belly pan & central fusion sub-frame
        const underbodyPan = new THREE.Mesh(new THREE.BoxGeometry(3.05, 0.16, 6.75), darkChassisMat);
        underbodyPan.position.set(0, -0.62, 0);
        carGroup.add(underbodyPan);

        // Sloped Front Hood Wedge with Crisp Side Creases & Recessed Hood Groove
        const hoodGeo = sculptGeometry(new THREE.BoxGeometry(3.16, 0.32, 2.52, 8, 2, 6), (x, y, z) => {
            const centerChannel = (y > 0 && Math.abs(x) < 1.15) ? -0.028 : 0;
            const frontDrop = (z < 0) ? z * 0.045 : 0;
            return [x, y + centerChannel + frontDrop, z];
        });
        const hoodMesh = new THREE.Mesh(hoodGeo, stainlessMat);
        hoodMesh.position.set(0, 0.20, -2.22);
        hoodMesh.rotation.x = -0.10;
        carGroup.add(hoodMesh);

        // Flared Stainless Wheel Arches framing the 4 Hover Wheel Wells
        const archCoords = [
            { x: -1.66, z: -2.18 },
            { x: 1.66, z: -2.18 },
            { x: -1.66, z: 2.18 },
            { x: 1.66, z: 2.18 }
        ];
        archCoords.forEach((ac) => {
            const sideSign = ac.x > 0 ? 1 : -1;
            const archLip = new THREE.Mesh(
                new THREE.TorusGeometry(0.76, 0.085, 10, 20, Math.PI),
                stainlessMat
            );
            archLip.rotation.y = sideSign * (Math.PI / 2);
            archLip.position.set(ac.x, -0.26, ac.z);
            carGroup.add(archLip);

            const wheelWellDark = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.24, 16), darkChassisMat);
            wheelWellDark.rotation.z = Math.PI / 2;
            wheelWellDark.position.set(ac.x * 0.92, -0.28, ac.z);
            carGroup.add(wheelWellDark);
        });

        // Black Side Rubbing Strips, Lower Rocker Skirts & Front/Rear Polyurethane Fascias
        const sideStrip = new THREE.Mesh(new THREE.BoxGeometry(3.52, 0.14, 7.32), bumperTrimMat);
        sideStrip.position.set(0, -0.18, 0);
        carGroup.add(sideStrip);

        const lowerRocker = new THREE.Mesh(new THREE.BoxGeometry(3.26, 0.14, 6.95), bumperTrimMat);
        lowerRocker.position.set(0, -0.52, 0);
        carGroup.add(lowerRocker);

        const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(3.38, 0.58, 0.52), bumperTrimMat);
        frontBumper.position.set(0, -0.24, -3.56);
        carGroup.add(frontBumper);

        const frontAirDam = new THREE.Mesh(new THREE.BoxGeometry(3.18, 0.22, 0.48), darkChassisMat);
        frontAirDam.position.set(0, -0.54, -3.52);
        carGroup.add(frontAirDam);

        // Front DMC Grille & Diagonal Chrome Emblem Slash
        const dmcGrille = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.20, 0.08), darkChassisMat);
        dmcGrille.position.set(0, -0.02, -3.81);
        carGroup.add(dmcGrille);

        const dmcSlash = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.045, 0.09), chromeMat);
        dmcSlash.position.set(0, -0.02, -3.82);
        dmcSlash.rotation.z = 0.48;
        carGroup.add(dmcSlash);

        const dmcBadge = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.095), chromeMat);
        dmcBadge.position.set(0, -0.02, -3.83);
        carGroup.add(dmcBadge);

        const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(3.38, 0.68, 0.52), bumperTrimMat);
        rearBumper.position.set(0, -0.20, 3.56);
        carGroup.add(rearBumper);

        // 2. Sculpted Gull-Wing Cabin Greenhouse, A/B-Pillars, Toll-Booth Windows & Interior Cockpit
        const cabinTopRoof = new THREE.Mesh(new THREE.BoxGeometry(2.38, 0.14, 1.98), stainlessMat);
        cabinTopRoof.position.set(0, 1.02, -0.05);
        carGroup.add(cabinTopRoof);

        // Central Gull-Wing Door Roof Hinge Seam & Overhead Time-Circuit Conduit Box
        const gullWingRoofSeam = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.16, 1.96), bumperTrimMat);
        gullWingRoofSeam.position.set(0, 1.03, -0.05);
        carGroup.add(gullWingRoofSeam);

        // Sloped Front Windshield (angled down toward the front cowl at -Z and up to the roof at +Z) & Twin Black Wiper Blades
        const windshieldGeo = sculptGeometry(new THREE.BoxGeometry(2.62, 0.06, 1.48, 6, 1, 4), (x, y, z) => {
            // Taper width from wide cowl base (z < 0: ~2.76) to narrower roof header (z > 0: ~2.36)
            const t = (z + 0.74) / 1.48;
            const widthScale = 1.05 - t * 0.15;
            return [x * widthScale, y, z];
        });
        const windshield = new THREE.Mesh(windshieldGeo, glassMat);
        windshield.position.set(0, 0.64, -1.58);
        windshield.rotation.x = -0.54;
        carGroup.add(windshield);

        [-0.55, 0.45].forEach((wx) => {
            const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.03, 0.04), bumperTrimMat);
            wiper.position.set(wx, 0.31, -2.14);
            wiper.rotation.y = 0.18;
            wiper.rotation.z = -0.08;
            carGroup.add(wiper);
        });

        // Sculpted Stainless A-Pillars & B-Pillars framing the Gull-Wing Doors
        [-1, 1].forEach((side) => {
            addTube(carGroup, [side * 1.48, 0.25, -2.18], [side * 1.18, 1.02, -0.98], 0.068, stainlessMat);
            addTube(carGroup, [side * 1.54, 0.25, 0.88], [side * 1.18, 1.02, 0.85], 0.085, stainlessMat);
            addTube(carGroup, [side * 1.54, 0.25, 2.52], [side * 1.24, 0.96, 1.12], 0.075, bumperTrimMat);

            // Tinted Gull-Wing Side Window with DMC-12 Iconic Inset "Toll-Booth" Drop-Glass Frame
            const sideWindow = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.64, 1.86), glassMat);
            sideWindow.position.set(side * 1.34, 0.66, -0.08);
            sideWindow.rotation.z = -side * 0.22;
            carGroup.add(sideWindow);

            const tollBoothFrame = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.30, 0.82), bumperTrimMat);
            tollBoothFrame.position.set(side * 1.38, 0.56, -0.14);
            tollBoothFrame.rotation.z = -side * 0.22;
            carGroup.add(tollBoothFrame);

            const doorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.22), bumperTrimMat);
            doorHandle.position.set(side * 1.72, 0.14, 0.52);
            carGroup.add(doorHandle);

            // Aerodynamic Black Wing Mirrors with Reflective Glass Face
            const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.24), bumperTrimMat);
            mirror.position.set(side * 1.66, 0.44, -1.08);
            carGroup.add(mirror);

            const mirrorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.13, 0.03), chromeMat);
            mirrorGlass.position.set(side * 1.68, 0.44, -0.96);
            carGroup.add(mirrorGlass);
        });

        // 3. Detailed Interior Cockpit: Dashboard, Time Circuits LED Display, 88 MPH Speedo, Flux Capacitor & Doc/Marty
        const cockpitGroup = new THREE.Group();
        carGroup.add(cockpitGroup);

        // Dashboard Binnacle & Center Console
        const dashBoard = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.38, 0.68), darkChassisMat);
        dashBoard.position.set(0, 0.42, -1.05);
        cockpitGroup.add(dashBoard);

        // Glowing 3-Row Time Circuits Display Module (Red 2015 / Green 1985 / Amber 1955) on Center Dash
        const timeCircuitMat = new THREE.MeshBasicMaterial({ map: timeCircuitsTex });
        const timeCircuitsBox = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.38, 0.34), timeCircuitMat);
        timeCircuitsBox.position.set(0.04, 0.64, -0.88);
        timeCircuitsBox.rotation.x = -0.22;
        cockpitGroup.add(timeCircuitsBox);

        // 88 MPH Digital Speedometer Box perched atop Driver's Binnacle + Plutonium Chamber Gauges
        const speedoBox = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.24), bumperTrimMat);
        speedoBox.position.set(-0.56, 0.68, -1.02);
        cockpitGroup.add(speedoBox);
        const speedoScreen = new THREE.Mesh(
            new THREE.BoxGeometry(0.26, 0.12, 0.04),
            new THREE.MeshBasicMaterial({ color: 0xef4444 })
        );
        speedoScreen.position.set(-0.56, 0.68, -0.89);
        cockpitGroup.add(speedoScreen);

        const plutoniumGauge = new THREE.Mesh(
            new THREE.BoxGeometry(0.42, 0.16, 0.22),
            new THREE.MeshBasicMaterial({ color: 0xfacc15 })
        );
        plutoniumGauge.position.set(0.56, 0.64, -0.96);
        cockpitGroup.add(plutoniumGauge);

        // Driver Steering Wheel
        const steeringWheel = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.032, 8, 18), bumperTrimMat);
        steeringWheel.position.set(-0.58, 0.48, -0.68);
        steeringWheel.rotation.x = -0.35;
        cockpitGroup.add(steeringWheel);

        // Leather Bucket Seats + Doc Brown & Marty McFly Silhouettes inside the Cabin
        const seatMat = new THREE.MeshPhongMaterial({ color: 0x334155, shininess: 35 });
        const martyVestMat = new THREE.MeshPhongMaterial({ color: 0xea580c, shininess: 45 });
        const docSuitMat = new THREE.MeshPhongMaterial({ color: 0xfef3c7, shininess: 40 });
        const skinMat = new THREE.MeshPhongMaterial({ color: 0xfdba74, shininess: 40 });

        [-0.58, 0.58].forEach((sx, idx) => {
            const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.78, 0.18), seatMat);
            seatBack.position.set(sx, 0.46, 0.34);
            seatBack.rotation.x = -0.14;
            cockpitGroup.add(seatBack);

            // Driver (Marty in orange puffer vest) & Passenger (Doc Brown with wild white hair & visor glasses)
            const torso = new THREE.Mesh(
                new THREE.CylinderGeometry(0.22, 0.26, 0.52, 12),
                idx === 0 ? martyVestMat : docSuitMat
            );
            torso.position.set(sx, 0.44, 0.12);
            cockpitGroup.add(torso);

            const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), skinMat);
            head.position.set(sx, 0.78, 0.10);
            cockpitGroup.add(head);

            if (idx === 0) {
                // Marty's brown hair / futuristic cap
                const cap = new THREE.Mesh(
                    new THREE.SphereGeometry(0.19, 10, 10),
                    new THREE.MeshPhongMaterial({ color: 0x451a03, shininess: 60 })
                );
                cap.scale.set(1.02, 0.82, 1.05);
                cap.position.set(sx, 0.84, 0.12);
                cockpitGroup.add(cap);
            } else {
                // Doc Brown's iconic wild white hair & silver 2015 wrap-around visor shades
                const docHair = new THREE.Mesh(
                    new THREE.SphereGeometry(0.23, 12, 10),
                    new THREE.MeshPhongMaterial({ color: 0xf8fafc, shininess: 30 })
                );
                docHair.scale.set(1.28, 0.92, 1.12);
                docHair.position.set(sx, 0.84, 0.15);
                cockpitGroup.add(docHair);

                const docVisor = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.065, 0.08), chromeMat);
                docVisor.position.set(sx, 0.79, -0.06);
                cockpitGroup.add(docVisor);
            }
        });

        // Iconic Glowing Y-Shaped Flux Capacitor mounted on the Rear Cabin Bulkhead between the Seats!
        const fluxBox = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.54, 0.22), bumperTrimMat);
        fluxBox.position.set(0, 0.64, 0.58);
        cockpitGroup.add(fluxBox);

        const fluxCapacitorGroup = new THREE.Group();
        fluxCapacitorGroup.position.set(0, 0.64, 0.46);
        addTube(fluxCapacitorGroup, [0, 0, 0], [-0.13, 0.16, 0], 0.028, fluxCapacitorGlowMat);
        addTube(fluxCapacitorGroup, [0, 0, 0], [0.13, 0.16, 0], 0.028, fluxCapacitorGlowMat);
        addTube(fluxCapacitorGroup, [0, 0, 0], [0, -0.18, 0], 0.028, fluxCapacitorGlowMat);
        const fluxCenterNode = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), fluxCapacitorGlowMat);
        fluxCapacitorGroup.add(fluxCenterNode);
        cockpitGroup.add(fluxCapacitorGroup);

        // 4. Iconic Stepped Rear Sun Louvers over the Engine Deck
        for (let l = 0; l < 7; l++) {
            const louver = new THREE.Mesh(new THREE.BoxGeometry(2.52, 0.05, 0.30), bumperTrimMat);
            louver.position.set(0, 0.96 - l * 0.09, 1.15 + l * 0.28);
            louver.rotation.x = -0.30;
            carGroup.add(louver);
        }

        // 5. Recessed Quad Rectangular Front Headlights, Amber Turn Signals & Checkered Rear Taillight Grids
        const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3 });
        const amberSignalMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        [-1.22, -0.82, 0.82, 1.22].forEach((hx) => {
            const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.22, 0.08), darkChassisMat);
            bezel.position.set(hx, 0.02, -3.79);
            carGroup.add(bezel);

            const hl = new THREE.Mesh(new THREE.BoxGeometry(0.31, 0.16, 0.09), headlightMat);
            hl.position.set(hx, 0.02, -3.81);
            carGroup.add(hl);
        });
        [-1.08, 1.08].forEach((ax) => {
            const turnSig = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, 0.08), amberSignalMat);
            turnSig.position.set(ax, -0.22, -3.82);
            carGroup.add(turnSig);
        });

        // Authentic DMC-12 Multi-Cell Rear Taillight Clusters (Red Brake, Amber Turn, White Reverse) + OUTATIME License Plate
        const tailRedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const tailReverseMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
        [-1.12, 1.12].forEach((tx) => {
            const housing = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.38, 0.08), darkChassisMat);
            housing.position.set(tx, -0.01, 3.79);
            carGroup.add(housing);

            for (let col = -1; col <= 1; col++) {
                const cellX = tx + col * 0.27;
                const redCell = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.15, 0.09), tailRedMat);
                redCell.position.set(cellX, 0.08, 3.81);
                carGroup.add(redCell);

                const lowerMat = (col === 0) ? tailReverseMat : amberSignalMat;
                const lowCell = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.13, 0.09), lowerMat);
                lowCell.position.set(cellX, -0.10, 3.81);
                carGroup.add(lowCell);
            }
        });

        const plateMat = new THREE.MeshBasicMaterial({ map: plateTex });
        const licensePlate = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.34, 0.06), plateMat);
        licensePlate.position.set(0, -0.02, 3.82);
        carGroup.add(licensePlate);

        // 6. Dual Huge Rear Nuclear Propulsion Exhaust Vents with Internal Cooling Fins & Plasma Afterburners
        const rearVentClusters = [];
        [-0.88, 0.88].forEach((vx) => {
            const ventGroup = new THREE.Group();
            ventGroup.position.set(vx, 0.66, 2.95);

            // Angled trapezoidal dark armor housing
            const ventHousingGeo = sculptGeometry(new THREE.BoxGeometry(0.98, 0.78, 1.28), (x, y, z) => {
                const rearFlare = z > 0 ? 1.08 : 0.90;
                const topSlope = (y > 0 && z < 0) ? -0.12 : 0;
                return [x * rearFlare, y * rearFlare + topSlope, z];
            });
            const ventHousing = new THREE.Mesh(ventHousingGeo, bumperTrimMat);
            ventGroup.add(ventHousing);

            // Stainless outer exhaust shroud & internal horizontal louvers
            const ventNozzle = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.62, 0.28), stainlessMat);
            ventNozzle.position.set(0, 0, 0.60);
            ventGroup.add(ventNozzle);

            for (let vf = -1; vf <= 1; vf++) {
                const fin = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.04, 0.32), darkChassisMat);
                fin.position.set(0, vf * 0.16, 0.62);
                ventGroup.add(fin);
            }

            // Glowing Cyan-Blue Plasma Core inside each Rear Vent
            const coreGlow = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.46, 0.14), thrusterGlowMat);
            coreGlow.position.set(0, 0, 0.71);
            ventGroup.add(coreGlow);
            rearVentClusters.push(coreGlow);

            // Copper & Crimson High-Voltage Reactor Coolant Conduits feeding into each vent
            addTube(carGroup, [vx * 0.55, 0.56, 1.65], [vx * 0.85, 0.68, 2.45], 0.055, copperCableMat);
            addTube(carGroup, [vx * 0.35, 0.52, 1.95], [vx * 0.72, 0.52, 2.45], 0.045, redCableMat);

            carGroup.add(ventGroup);
        });

        // 7. Authentic Mr. Fusion Home Energy Reactor on the Rear Reactor Deck
        const reactorDeck = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.76, 0.18, 20), darkChassisMat);
        reactorDeck.position.set(0, 0.48, 2.48);
        carGroup.add(reactorDeck);

        const mrFusionBase = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.40, 0.42, 18), bumperTrimMat);
        mrFusionBase.position.set(0, 0.72, 2.48);
        carGroup.add(mrFusionBase);

        const mrFusionBody = new THREE.Mesh(
            new THREE.CylinderGeometry(0.24, 0.29, 0.48, 18),
            new THREE.MeshPhongMaterial({ color: 0xf8fafc, specular: 0xffffff, shininess: 140 })
        );
        mrFusionBody.position.set(0, 1.14, 2.48);
        carGroup.add(mrFusionBody);

        // Red Mr. Fusion locking latch & translucent hopper dome cap
        const mrFusionLatch = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.12), redCableMat);
        mrFusionLatch.position.set(0, 1.12, 2.74);
        carGroup.add(mrFusionLatch);

        const mrFusionDome = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.23, 0.22, 16), glassMat);
        mrFusionDome.position.set(0, 1.46, 2.48);
        carGroup.add(mrFusionDome);

        // 8. Braided Stainless Flux Bands, Blue Emitter Blocks & Side Temporal Conduit Bundles
        const fluxCoilMeshes = [];
        const frontFluxBand = new THREE.Mesh(new THREE.BoxGeometry(3.52, 0.14, 0.68), fluxBandMat);
        frontFluxBand.position.set(0, -0.02, -3.45);
        carGroup.add(frontFluxBand);
        fluxCoilMeshes.push(frontFluxBand);

        const rearFluxBand = new THREE.Mesh(new THREE.BoxGeometry(3.52, 0.14, 0.68), fluxBandMat);
        rearFluxBand.position.set(0, 0.08, 3.45);
        carGroup.add(rearFluxBand);
        fluxCoilMeshes.push(rearFluxBand);

        const roofFluxBand = new THREE.Mesh(new THREE.BoxGeometry(2.58, 0.11, 0.36), fluxBandMat);
        roofFluxBand.position.set(0, 1.06, 0.82);
        carGroup.add(roofFluxBand);
        fluxCoilMeshes.push(roofFluxBand);

        // Front Bumper Blue Emitter Boxes & Braided Fender Conduits
        [-1, 1].forEach((side) => {
            const frontEmitterBox = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.26, 0.38), chromeMat);
            frontEmitterBox.position.set(side * 1.66, 0.02, -3.38);
            carGroup.add(frontEmitterBox);

            const rearEmitterBox = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.26, 0.38), chromeMat);
            rearEmitterBox.position.set(side * 1.66, 0.08, 3.32);
            carGroup.add(rearEmitterBox);

            // Glowing blue temporal cable + copper & dark braided conduit pipes along the body sides
            const sideCable = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 6.68, 10), fluxBandMat);
            sideCable.rotation.x = Math.PI / 2;
            sideCable.position.set(side * 1.74, 0.01, 0);
            carGroup.add(sideCable);
            fluxCoilMeshes.push(sideCable);

            const copperPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 6.45, 8), copperCableMat);
            copperPipe.rotation.x = Math.PI / 2;
            copperPipe.position.set(side * 1.73, -0.07, 0);
            carGroup.add(copperPipe);

            // Upper fender-to-roof braided flux band arches
            addTube(carGroup, [side * 1.66, 0.06, -3.32], [side * 1.54, 0.36, -1.95], 0.048, fluxBandMat);
            addTube(carGroup, [side * 1.54, 0.36, -1.95], [side * 1.24, 1.04, 0.82], 0.045, chromeMat);
        });

        // 9. 4 Hover-Converted Horizontally Folded Wheels with Gold Rim Turbines, Hydraulic Struts & Plasma Rings
        const hoverWheelRings = [];
        const wheelCoords = [
            { x: -1.72, z: -2.18 },
            { x: 1.72, z: -2.18 },
            { x: -1.72, z: 2.18 },
            { x: 1.72, z: 2.18 }
        ];
        wheelCoords.forEach((wc) => {
            const wGroup = new THREE.Group();
            wGroup.position.set(wc.x, -0.55, wc.z);
            const inDir = wc.x > 0 ? -1 : 1;

            // Articulated Dual Scissor Hydraulic Hover Strut Arms extending from the wheel well
            const mainStrut = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.14, 0.26), stainlessMat);
            mainStrut.position.set(inDir * 0.26, 0.14, 0);
            wGroup.add(mainStrut);

            addTube(wGroup, [inDir * 0.52, 0.28, -0.14], [0, 0.06, -0.10], 0.038, copperCableMat);
            addTube(wGroup, [inDir * 0.52, 0.28, 0.14], [0, 0.06, 0.10], 0.038, chromeMat);

            // Horizontally folded GoodYear tire (facing downward for BTTF Part II hover mode!)
            const tire = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.22, 14, 28), bumperTrimMat);
            tire.rotation.x = Math.PI / 2;
            wGroup.add(tire);

            // Gold-Anodized Part II Hover Conversion Rim & Finned DMC Turbine Hub
            const goldRimRing = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.055, 10, 24), goldRimMat);
            goldRimRing.rotation.x = Math.PI / 2;
            goldRimRing.position.y = 0.06;
            wGroup.add(goldRimRing);

            const hubDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.18, 20), stainlessMat);
            wGroup.add(hubDisc);

            // 12 Radial DMC Turbine Vanes on the Wheel Hub
            for (let v = 0; v < 12; v++) {
                const vAng = (v / 12) * Math.PI * 2;
                const vane = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.21, 0.38), chromeMat);
                vane.position.set(Math.sin(vAng) * 0.24, 0.02, Math.cos(vAng) * 0.24);
                vane.rotation.y = vAng;
                wGroup.add(vane);
            }

            // Concentric Glowing Cyan Hover Thruster Ring & Inner Plasma Core under each wheel
            const glowRing = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.095, 12, 28), thrusterGlowMat);
            glowRing.rotation.x = Math.PI / 2;
            glowRing.position.y = -0.14;
            wGroup.add(glowRing);

            const innerPlasmaDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.18, 0.08, 18), fluxBandMat);
            innerPlasmaDisc.position.y = -0.12;
            glowRing.add(innerPlasmaDisc);

            hoverWheelRings.push(glowRing);
            carGroup.add(wGroup);
        });

        this.avatarAnimParts = {
            carGroup,
            hoverWheelRings,
            rearVentClusters,
            fluxCoilMeshes,
            fluxCapacitorGroup,
            fluxBandMat,
            thrusterGlowMat
        };

        this.dragonGroup.position.set(0, this.dragonCurrentY, 0);
        this.scene.add(this.dragonGroup);
    },

    /**
     * Procedural mirror-polished 1950s fluted chrome & concentric Art-Deco saucer hull texture for Mars Attacks! UFO.
     */
    createMarsAttacksChromeHullTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const cx = 256;
        const cy = 256;

        // High-contrast liquid-silver radial chrome gradient
        const radGrad = ctx.createRadialGradient(cx, cy, 8, cx, cy, 256);
        radGrad.addColorStop(0.0, '#ffffff');
        radGrad.addColorStop(0.18, '#f1f5f9');
        radGrad.addColorStop(0.38, '#cbd5e1');
        radGrad.addColorStop(0.55, '#94a3b8');
        radGrad.addColorStop(0.72, '#e2e8f0');
        radGrad.addColorStop(0.88, '#64748b');
        radGrad.addColorStop(1.0, '#1e293b');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, 512, 512);

        // 36 Radial fluted saucer ribs & metallic specular wedge highlights (classic Mars Attacks! molded saucer look)
        const numFlutes = 36;
        for (let i = 0; i < numFlutes; i++) {
            const a0 = (i / numFlutes) * Math.PI * 2;
            const a1 = ((i + 0.5) / numFlutes) * Math.PI * 2;
            ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.16)' : 'rgba(15, 23, 42, 0.14)';
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, 254, a0, a1);
            ctx.closePath();
            ctx.fill();

            // Crisp radial seam line
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.38)';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a0) * 34, cy + Math.sin(a0) * 34);
            ctx.lineTo(cx + Math.cos(a0) * 254, cy + Math.sin(a0) * 254);
            ctx.stroke();

            // Rivet pairs along each radial seam
            [82, 134, 184, 228].forEach((r) => {
                const rx = cx + Math.cos(a0 + 0.03) * r;
                const ry = cy + Math.sin(a0 + 0.03) * r;
                ctx.fillStyle = 'rgba(30, 41, 59, 0.55)';
                ctx.beginPath();
                ctx.arc(rx, ry, 2.2, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Concentric stepped Art-Deco trim rings
        [52, 96, 146, 196, 236, 248].forEach((r, idx) => {
            ctx.strokeStyle = idx % 2 === 0 ? 'rgba(255, 255, 255, 0.55)' : 'rgba(15, 23, 42, 0.45)';
            ctx.lineWidth = idx === 4 ? 3.2 : 2.0;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
        });

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    },

    /**
     * Procedural convoluted pink-crimson Martian brain sulci & gyri texture for the Mars Attacks! pilot.
     */
    createMartianBrainTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        const baseGrad = ctx.createLinearGradient(0, 0, 256, 256);
        baseGrad.addColorStop(0.0, '#fb7185');
        baseGrad.addColorStop(0.5, '#f43f5e');
        baseGrad.addColorStop(1.0, '#be123c');
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, 256, 256);

        // Winding cerebral folds (gyri highlights and deep dark-crimson sulci)
        for (let i = 0; i < 68; i++) {
            const x0 = (Math.sin(i * 41.3) * 0.5 + 0.5) * 256;
            const y0 = (Math.cos(i * 67.9) * 0.5 + 0.5) * 256;
            const cx1 = x0 + Math.cos(i * 2.1) * 42;
            const cy1 = y0 + Math.sin(i * 1.7) * 42;
            const x1 = x0 + Math.sin(i * 3.3) * 58;
            const y1 = y0 + Math.cos(i * 2.9) * 58;

            // Thick pinkish-white gyrus ridge
            ctx.strokeStyle = 'rgba(255, 228, 230, 0.45)';
            ctx.lineWidth = 9;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(cx1, cy1, x1, y1);
            ctx.stroke();

            // Deep dark-burgundy sulcus crease
            ctx.strokeStyle = 'rgba(76, 5, 25, 0.72)';
            ctx.lineWidth = 3.2;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(cx1, cy1, x1, y1);
            ctx.stroke();
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        return tex;
    },

    /**
     * Builds the UFO from Mars Attacks! (classic 1950s/Tim Burton retro-futuristic chrome flying saucer
     * with smooth LatheGeometry Art-Deco stepped concentric hull tiers, fluted radial ribs, glowing perimeter
     * slots & domes, ventral central gravity sphere with 3 landing hemisphere pods, cockpit control console
     * with steering yoke & brain-wave screen, detailed Martian Leader/Pilot with oversized convoluted brain,
     * skull-like grin, red cape & high gold collar, clear helmet, glass cockpit dome with top ray-fin spire,
     * and twin articulated retro-futuristic coil-ring disintegrator ray cannons).
     */
    buildMarsAttacksUfo() {
        this.dragonGroup = new THREE.Group();

        const hullTex = (this.createMarsAttacksChromeHullTexture || window.Performed3DAvatarModels.createMarsAttacksChromeHullTexture).call(this);
        const brainTex = (this.createMartianBrainTexture || window.Performed3DAvatarModels.createMartianBrainTexture).call(this);

        const saucerChromeMat = new THREE.MeshPhongMaterial({
            color: 0xe2e8f0,
            map: hullTex,
            bumpMap: hullTex,
            bumpScale: 0.055,
            specular: 0xffffff,
            shininess: 185
        });
        const mirrorChromeMat = new THREE.MeshPhongMaterial({
            color: 0xf8fafc,
            specular: 0xffffff,
            shininess: 200
        });
        const darkTrimMat = new THREE.MeshPhongMaterial({
            color: 0x334155,
            specular: 0x94a3b8,
            shininess: 135
        });
        const domeGlassMat = new THREE.MeshPhongMaterial({
            color: 0xdbeafe,
            emissive: 0x082f49,
            emissiveIntensity: 0.35,
            specular: 0xffffff,
            shininess: 200,
            transparent: true,
            opacity: 0.34
        });
        const helmetGlassMat = new THREE.MeshPhongMaterial({
            color: 0xe0f2fe,
            specular: 0xffffff,
            shininess: 195,
            transparent: true,
            opacity: 0.28
        });
        const martianBrainMat = new THREE.MeshPhongMaterial({
            color: 0xf43f5e,
            map: brainTex,
            bumpMap: brainTex,
            bumpScale: 0.095,
            emissive: 0x4c0519,
            specular: 0xfecdd3,
            shininess: 95
        });
        const martianSkinMat = new THREE.MeshPhongMaterial({
            color: 0x4ade80,
            emissive: 0x064e3b,
            specular: 0x86efac,
            shininess: 70
        });
        const martianSuitRedMat = new THREE.MeshPhongMaterial({
            color: 0xdc2626,
            emissive: 0x450a0a,
            specular: 0xfca5a5,
            shininess: 90
        });
        const martianGoldMat = new THREE.MeshPhongMaterial({
            color: 0xfacc15,
            emissive: 0x422006,
            specular: 0xfef08a,
            shininess: 150
        });
        const greenPlasmaMat = new THREE.MeshBasicMaterial({
            color: 0x4ade80
        });
        const redPlasmaMat = new THREE.MeshBasicMaterial({
            color: 0xf43f5e
        });
        const cyanPlasmaMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8
        });

        const ufoRoot = new THREE.Group();
        this.dragonGroup.add(ufoRoot);

        // 1. Rotating Outer Saucer Disc Group
        const spinningDiscGroup = new THREE.Group();
        ufoRoot.add(spinningDiscGroup);

        // Smooth LatheGeometry Stepped Biconvex Art-Deco Flying Saucer Profile
        const lathePoints = [
            new THREE.Vector2(0.0, -0.78),
            new THREE.Vector2(1.55, -0.78),
            new THREE.Vector2(2.85, -0.62),
            new THREE.Vector2(4.15, -0.40),
            new THREE.Vector2(5.15, -0.18),
            new THREE.Vector2(5.42, -0.04),
            new THREE.Vector2(5.18, 0.14),
            new THREE.Vector2(4.25, 0.36),
            new THREE.Vector2(3.55, 0.44),
            new THREE.Vector2(3.45, 0.62),
            new THREE.Vector2(2.75, 0.72),
            new THREE.Vector2(2.45, 0.86),
            new THREE.Vector2(0.0, 0.86)
        ];
        const latheHull = new THREE.Mesh(new THREE.LatheGeometry(lathePoints, 48), saucerChromeMat);
        spinningDiscGroup.add(latheHull);

        // Keep classic upper & lower saucer core cylinders inside for structural shadow depth & compatibility
        const mainDisc = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 5.1, 0.72, 36), saucerChromeMat);
        mainDisc.position.y = 0.15;
        spinningDiscGroup.add(mainDisc);

        const lowerDisc = new THREE.Mesh(new THREE.CylinderGeometry(5.1, 2.8, 0.58, 36), saucerChromeMat);
        lowerDisc.position.y = -0.45;
        spinningDiscGroup.add(lowerDisc);

        // Knife-Edge Chrome Equator Rim & Stepped Concentric Flanges
        const outerRimTorus = new THREE.Mesh(new THREE.TorusGeometry(5.32, 0.16, 16, 48), darkTrimMat);
        outerRimTorus.rotation.x = Math.PI / 2;
        outerRimTorus.position.y = -0.04;
        spinningDiscGroup.add(outerRimTorus);

        const chromeLipTorus = new THREE.Mesh(new THREE.TorusGeometry(5.44, 0.075, 12, 48), mirrorChromeMat);
        chromeLipTorus.rotation.x = Math.PI / 2;
        chromeLipTorus.position.y = -0.04;
        spinningDiscGroup.add(chromeLipTorus);

        const midStepRing = new THREE.Mesh(new THREE.TorusGeometry(3.52, 0.11, 12, 40), mirrorChromeMat);
        midStepRing.rotation.x = Math.PI / 2;
        midStepRing.position.y = 0.52;
        spinningDiscGroup.add(midStepRing);

        const upperStepCollar = new THREE.Mesh(new THREE.CylinderGeometry(2.42, 3.15, 0.42, 36), darkTrimMat);
        upperStepCollar.position.y = 0.68;
        spinningDiscGroup.add(upperStepCollar);

        const cockpitBezelRing = new THREE.Mesh(new THREE.TorusGeometry(2.38, 0.13, 14, 40), mirrorChromeMat);
        cockpitBezelRing.rotation.x = Math.PI / 2;
        cockpitBezelRing.position.y = 0.86;
        spinningDiscGroup.add(cockpitBezelRing);

        // 18 Radial Molded Chrome Hull Ribs / Cooling Fins across the Upper Saucer Slope
        for (let r = 0; r < 18; r++) {
            const ribAngle = (r / 18) * Math.PI * 2;
            const ribGroup = new THREE.Group();
            ribGroup.rotation.y = ribAngle;

            const ribStrut = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.12, 2.35), mirrorChromeMat);
            ribStrut.position.set(0, 0.42, 3.72);
            ribStrut.rotation.x = 0.21;
            ribGroup.add(ribStrut);

            // Recessed glowing green vent slit between every rib along the mid-saucer step
            const ventSlit = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.14), greenPlasmaMat);
            ventSlit.position.set(0, 0.50, 3.48);
            ribGroup.add(ventSlit);

            spinningDiscGroup.add(ribGroup);
        }

        // 12 Glowing Martian Plasma Orbs & Beveled Chrome Porthole Bezels around the Saucer Perimeter
        const rimLightMeshes = [];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const px = Math.cos(angle) * 5.22;
            const pz = Math.sin(angle) * 5.22;

            // Chrome Porthole Housing Bezel
            const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 10, 18), mirrorChromeMat);
            bezel.position.set(px, -0.04, pz);
            bezel.lookAt(px * 2, -0.04, pz * 2);
            spinningDiscGroup.add(bezel);

            const orbMat = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x4ade80 : 0xf43f5e
            });
            const orb = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 14), orbMat);
            orb.position.set(px, -0.04, pz);
            spinningDiscGroup.add(orb);
            rimLightMeshes.push(orb);

            // Elongated glowing plasma edge slot between adjacent perimeter orbs
            const slotAngle = angle + (Math.PI / 12);
            const slotMesh = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.09, 0.16), i % 2 === 0 ? greenPlasmaMat : redPlasmaMat);
            slotMesh.position.set(Math.cos(slotAngle) * 5.34, -0.04, Math.sin(slotAngle) * 5.34);
            slotMesh.rotation.y = -slotAngle + Math.PI / 2;
            spinningDiscGroup.add(slotMesh);
        }

        // 2. Authentic Mars Attacks! Underside: Central Anti-Gravity Core, Concentric Tractor Rings & 3 Hemispherical Landing Domes
        const ventralHousing = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 1.65, 0.36, 32), darkTrimMat);
        ventralHousing.position.y = -0.76;
        spinningDiscGroup.add(ventralHousing);

        const tractorCore = new THREE.Mesh(new THREE.SphereGeometry(1.15, 24, 18), greenPlasmaMat);
        tractorCore.scale.set(1.0, 0.48, 1.0);
        tractorCore.position.y = -0.88;
        spinningDiscGroup.add(tractorCore);

        const tractorHalo = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.14, 12, 32), greenPlasmaMat);
        tractorHalo.rotation.x = Math.PI / 2;
        tractorHalo.position.y = -0.92;
        spinningDiscGroup.add(tractorHalo);

        const outerTractorRing = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.08, 10, 36), redPlasmaMat);
        outerTractorRing.rotation.x = Math.PI / 2;
        outerTractorRing.position.y = -0.78;
        spinningDiscGroup.add(outerTractorRing);

        // 3 Iconic Hemispherical Chrome Landing Blisters with Glowing Cores
        for (let b = 0; b < 3; b++) {
            const bAng = (b / 3) * Math.PI * 2;
            const bx = Math.cos(bAng) * 3.25;
            const bz = Math.sin(bAng) * 3.25;

            const podCollar = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.09, 10, 24), darkTrimMat);
            podCollar.rotation.x = Math.PI / 2;
            podCollar.position.set(bx, -0.56, bz);
            spinningDiscGroup.add(podCollar);

            const pod = new THREE.Mesh(new THREE.SphereGeometry(0.72, 18, 14), mirrorChromeMat);
            pod.scale.set(1.0, 0.58, 1.0);
            pod.position.set(bx, -0.66, bz);
            spinningDiscGroup.add(pod);

            const podGlow = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), greenPlasmaMat);
            podGlow.scale.set(1.0, 0.45, 1.0);
            podGlow.position.set(bx, -0.98, bz);
            spinningDiscGroup.add(podGlow);
        }

        // 3. Detailed Cockpit Tub, Martian Control Console, Radar Screen & Steering Yoke
        const cockpitFloor = new THREE.Mesh(new THREE.CylinderGeometry(2.22, 2.05, 0.18, 32), darkTrimMat);
        cockpitFloor.position.y = 0.82;
        ufoRoot.add(cockpitFloor);

        // Curved Chrome & Crimson Command Chair Backrest behind the Martian Pilot
        const seatBack = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.15, 0.24), martianSuitRedMat);
        seatBack.position.set(0, 1.42, 0.85);
        seatBack.rotation.x = -0.16;
        ufoRoot.add(seatBack);

        const seatTrim = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.22, 0.18), martianGoldMat);
        seatTrim.position.set(0, 1.42, 0.92);
        seatTrim.rotation.x = -0.16;
        ufoRoot.add(seatTrim);

        // Front Cockpit Instrument Dashboard & Glowing Green Disintegrator Targeting Radar
        const consoleBase = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.58, 0.65), darkTrimMat);
        consoleBase.position.set(0, 1.12, -1.18);
        consoleBase.rotation.x = 0.28;
        ufoRoot.add(consoleBase);

        const radarScreen = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.36, 0.08), greenPlasmaMat);
        radarScreen.position.set(0, 1.32, -0.88);
        radarScreen.rotation.x = -0.35;
        ufoRoot.add(radarScreen);

        // Glowing Red & Cyan Instrument Buttons on Console
        [-0.55, -0.38, 0.38, 0.55].forEach((bx, idx) => {
            const btn = new THREE.Mesh(
                new THREE.SphereGeometry(0.065, 8, 8),
                idx % 2 === 0 ? redPlasmaMat : cyanPlasmaMat
            );
            btn.position.set(bx, 1.34, -0.92);
            ufoRoot.add(btn);
        });

        // Retro Control Yoke Column
        const yokeShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.55, 10), mirrorChromeMat);
        yokeShaft.position.set(0, 1.36, -0.72);
        yokeShaft.rotation.x = -0.45;
        ufoRoot.add(yokeShaft);

        const yokeRing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 8, 20, Math.PI * 1.35), martianGoldMat);
        yokeRing.position.set(0, 1.54, -0.58);
        yokeRing.rotation.x = 0.35;
        yokeRing.rotation.z = -Math.PI * 0.175;
        ufoRoot.add(yokeRing);

        // 4. Iconic Mars Attacks! Martian Pilot inside the Cockpit ("ACK! ACK!")
        const martianPilotGroup = new THREE.Group();
        martianPilotGroup.position.set(0, 0.88, 0.05);

        // Ribbed Red Martian Flight Suit Torso & Gold Chest Emblem
        const suitTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.92, 0.68, 18), martianSuitRedMat);
        suitTorso.position.y = 0.24;
        martianPilotGroup.add(suitTorso);

        // Dramatic Flared High Golden-Crimson Imperial Martian Collar
        const suitCollar = new THREE.Mesh(
            new THREE.CylinderGeometry(1.18, 0.78, 0.46, 20, 1, true),
            martianGoldMat
        );
        suitCollar.material.side = THREE.DoubleSide;
        suitCollar.position.set(0, 0.58, 0.12);
        suitCollar.rotation.x = -0.25;
        martianPilotGroup.add(suitCollar);

        // Martian Arms & Three-Fingered Green Hands Gripping the Controls
        [-1, 1].forEach((side) => {
            const shoulderPad = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), martianGoldMat);
            shoulderPad.scale.set(1.2, 0.75, 1.0);
            shoulderPad.position.set(side * 0.76, 0.46, -0.02);
            martianPilotGroup.add(shoulderPad);

            const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.68, 10), martianSuitRedMat);
            arm.position.set(side * 0.52, 0.42, -0.36);
            arm.rotation.x = Math.PI / 2 - 0.25;
            arm.rotation.z = side * 0.38;
            martianPilotGroup.add(arm);

            const hand = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 10), martianSkinMat);
            hand.position.set(side * 0.26, 0.54, -0.62);
            martianPilotGroup.add(hand);
        });

        // Chrome Life-Support Neck Ring (base of the personal Martian glass helmet)
        const neckRing = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.085, 12, 24), mirrorChromeMat);
        neckRing.rotation.x = Math.PI / 2;
        neckRing.position.set(0, 0.52, -0.04);
        martianPilotGroup.add(neckRing);

        // Sunken Green Martian Skull, Prominent Cheekbones & Narrow Jaw
        const martianFace = new THREE.Mesh(new THREE.SphereGeometry(0.54, 18, 16), martianSkinMat);
        martianFace.scale.set(0.88, 1.02, 0.92);
        martianFace.position.set(0, 0.82, -0.12);
        martianPilotGroup.add(martianFace);

        // Sculpted Zygomatic Cheekbones & Brow Ridge
        [-1, 1].forEach((side) => {
            const cheekBone = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), martianSkinMat);
            cheekBone.scale.set(1.15, 0.65, 0.95);
            cheekBone.position.set(side * 0.36, 0.76, -0.42);
            martianPilotGroup.add(cheekBone);

            const brow = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.09, 0.18), martianSkinMat);
            brow.position.set(side * 0.24, 1.02, -0.54);
            brow.rotation.z = -side * 0.24;
            martianPilotGroup.add(brow);
        });

        // Two Skeletal Nasal Cavities (No Nose)
        const nostrilMat = new THREE.MeshBasicMaterial({ color: 0x064e3b });
        [-0.07, 0.07].forEach((nx) => {
            const nasalSlit = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.11, 0.06), nostrilMat);
            nasalSlit.position.set(nx, 0.78, -0.61);
            martianPilotGroup.add(nasalSlit);
        });

        // Signature Mars Attacks! Lidless Exposed Grinning Jaws & Row of Tall Teeth
        const mouthCavity = new THREE.Mesh(
            new THREE.CylinderGeometry(0.36, 0.32, 0.22, 16, 1, false, -Math.PI * 0.38, Math.PI * 0.76),
            new THREE.MeshBasicMaterial({ color: 0x4c0519 })
        );
        mouthCavity.position.set(0, 0.60, -0.32);
        martianPilotGroup.add(mouthCavity);

        const toothMat = new THREE.MeshPhongMaterial({ color: 0xfef9c3, specular: 0xffffff, shininess: 140 });
        for (let t = -3; t <= 3; t++) {
            const tAng = t * 0.16;
            const tx = Math.sin(tAng) * 0.37;
            const tz = -0.30 - Math.cos(tAng) * 0.37;
            // Upper & lower teeth rows
            const upperTooth = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.095, 0.05), toothMat);
            upperTooth.position.set(tx, 0.65, tz);
            upperTooth.rotation.y = -tAng;
            martianPilotGroup.add(upperTooth);

            const lowerTooth = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.095, 0.05), toothMat);
            lowerTooth.position.set(tx, 0.54, tz);
            lowerTooth.rotation.y = -tAng;
            martianPilotGroup.add(lowerTooth);
        }

        // Huge Exposed Multi-Lobed Convoluted Pink-Crimson Martian Brain (sweeping far back!)
        const brainLeft = new THREE.Mesh(new THREE.SphereGeometry(0.72, 22, 18), martianBrainMat);
        brainLeft.scale.set(0.96, 1.16, 1.45);
        brainLeft.position.set(-0.34, 1.38, 0.12);
        brainLeft.rotation.x = -0.18;
        martianPilotGroup.add(brainLeft);

        const brainRight = new THREE.Mesh(new THREE.SphereGeometry(0.72, 22, 18), martianBrainMat);
        brainRight.scale.set(0.96, 1.16, 1.45);
        brainRight.position.set(0.34, 1.38, 0.12);
        brainRight.rotation.x = -0.18;
        martianPilotGroup.add(brainRight);

        // Posterior Occipital & Temporal Brain Lobes for the signature top-heavy Mars Attacks silhouette
        [-0.28, 0.28].forEach((bx) => {
            const rearLobe = new THREE.Mesh(new THREE.SphereGeometry(0.56, 18, 14), martianBrainMat);
            rearLobe.scale.set(0.95, 0.92, 1.35);
            rearLobe.position.set(bx, 1.18, 0.56);
            martianPilotGroup.add(rearLobe);

            const templeLobe = new THREE.Mesh(new THREE.SphereGeometry(0.46, 16, 12), martianBrainMat);
            templeLobe.scale.set(1.15, 0.85, 1.12);
            templeLobe.position.set(bx * 1.95, 1.16, -0.05);
            martianPilotGroup.add(templeLobe);
        });

        // Bulging Bloodshot Martian Eyes with Red Irises & Black Pinpoint Pupils
        const bulgeEyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
        const redIrisMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });
        const blackPupilMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
        [-0.24, 0.24].forEach((ex) => {
            const eyeball = new THREE.Mesh(new THREE.SphereGeometry(0.175, 14, 14), bulgeEyeMat);
            eyeball.position.set(ex, 0.89, -0.56);
            martianPilotGroup.add(eyeball);

            const iris = new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 12), redIrisMat);
            iris.position.set(ex, 0.89, -0.70);
            martianPilotGroup.add(iris);

            const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.048, 8, 8), blackPupilMat);
            pupil.position.set(ex, 0.89, -0.77);
            martianPilotGroup.add(pupil);
        });

        // Personal Transparent Martian Glass Space Helmet around the Brain & Head
        const personalHelmet = new THREE.Mesh(new THREE.SphereGeometry(1.16, 20, 16), helmetGlassMat);
        personalHelmet.scale.set(0.92, 1.15, 1.18);
        personalHelmet.position.set(0, 1.24, 0.08);
        martianPilotGroup.add(personalHelmet);

        ufoRoot.add(martianPilotGroup);
        this.dragonHeadGroup = martianPilotGroup;

        // 5. Translucent Glass Cockpit Bubble Dome + Classic 1950s Top Fin & Disintegrator Antenna Spire
        const glassDome = new THREE.Mesh(
            new THREE.SphereGeometry(2.38, 32, 22, 0, Math.PI * 2, 0, Math.PI * 0.54),
            domeGlassMat
        );
        glassDome.position.y = 0.78;
        ufoRoot.add(glassDome);

        // Top Dome Apex Cap, Swept Chrome Dorsal Fin & Multi-Ring Tesla Spire
        const apexCap = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.58, 0.18, 20), mirrorChromeMat);
        apexCap.position.y = 3.12;
        ufoRoot.add(apexCap);

        const antennaSpire = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.12, 1.05, 12), mirrorChromeMat);
        antennaSpire.position.y = 3.68;
        ufoRoot.add(antennaSpire);

        [3.38, 3.62, 3.86].forEach((ry, idx) => {
            const coilRing = new THREE.Mesh(new THREE.TorusGeometry(0.24 - idx * 0.05, 0.03, 8, 18), martianGoldMat);
            coilRing.rotation.x = Math.PI / 2;
            coilRing.position.y = ry;
            ufoRoot.add(coilRing);
        });

        const antennaBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), redPlasmaMat);
        antennaBeacon.position.y = 4.24;
        ufoRoot.add(antennaBeacon);

        // 6. Forward Ray-Blaster Cannon Emitter + Twin Articulated Mars Attacks! Coil-Ring Disintegrator Ray Guns
        const rayBlaster = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.15, 14), darkTrimMat);
        rayBlaster.rotation.x = -Math.PI / 2;
        rayBlaster.position.set(0, 0.02, -5.42);
        ufoRoot.add(rayBlaster);

        // Atomic Coil Rings along the central Ray-Blaster Barrel
        [0, 1, 2].forEach((cIdx) => {
            const barrelRing = new THREE.Mesh(
                new THREE.TorusGeometry(0.24 - cIdx * 0.04, 0.035, 8, 16),
                martianGoldMat
            );
            barrelRing.position.set(0, 0.02, -5.05 - cIdx * 0.28);
            ufoRoot.add(barrelRing);
        });

        const rayTip = new THREE.Mesh(new THREE.SphereGeometry(0.21, 14, 14), greenPlasmaMat);
        rayTip.position.set(0, 0.02, -6.02);
        ufoRoot.add(rayTip);

        // Twin Flanking Martian Disintegrator Ray Cannons on the Forward Rim
        const sideRayTips = [];
        [-1, 1].forEach((side) => {
            const cannonGroup = new THREE.Group();
            cannonGroup.position.set(side * 2.15, -0.02, -4.85);
            cannonGroup.rotation.y = -side * 0.08;

            const turretMount = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), mirrorChromeMat);
            cannonGroup.add(turretMount);

            const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.16, 1.18, 12), martianSuitRedMat);
            barrel.rotation.x = -Math.PI / 2;
            barrel.position.z = -0.58;
            cannonGroup.add(barrel);

            [0, 1, 2].forEach((rIdx) => {
                const finRing = new THREE.Mesh(
                    new THREE.TorusGeometry(0.21 - rIdx * 0.035, 0.03, 8, 16),
                    mirrorChromeMat
                );
                finRing.position.z = -0.35 - rIdx * 0.26;
                cannonGroup.add(finRing);
            });

            const emitterTip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), redPlasmaMat);
            emitterTip.position.z = -1.22;
            cannonGroup.add(emitterTip);
            sideRayTips.push(emitterTip);

            ufoRoot.add(cannonGroup);
        });

        this.avatarAnimParts = {
            spinningDiscGroup,
            martianPilotGroup,
            tractorCore,
            tractorHalo,
            outerTractorRing,
            rimLightMeshes,
            rayTip,
            sideRayTips,
            antennaBeacon
        };

        this.dragonGroup.position.set(0, this.dragonCurrentY, 0);
        this.scene.add(this.dragonGroup);
    }
};
