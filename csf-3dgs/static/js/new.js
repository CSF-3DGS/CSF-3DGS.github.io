
document.addEventListener('DOMContentLoaded', function () {
    function syncBeforeAfterSize(container) {
        const afterElement = container.querySelector('.bal-after');
        const beforeInsetElement = container.querySelector('.bal-before-inset');

        if (afterElement && beforeInsetElement) {
            const afterWidth = afterElement.offsetWidth;
            const afterHeight = afterElement.offsetHeight;

            beforeInsetElement.style.width = afterWidth + 'px';
            beforeInsetElement.style.height = afterHeight + 'px';
        }
    }

    function BeforeAfter(options) {
        this.container = document.querySelector(options.id);
        this.handle = this.container.querySelector('.bal-handle');
        this.before = this.container.querySelector('.bal-before');
        this.after = this.container.querySelector('.bal-after');
        this.beforeInset = this.before.querySelector('.bal-before-inset');

        this.init();
    }

    BeforeAfter.prototype.init = function () {
        const self = this;
        this.handle.addEventListener('mousedown', function (e) { self.onDragStart(e); });
        document.addEventListener('mousemove', function (e) { self.onDrag(e); });
        document.addEventListener('mouseup', function () { self.onDragEnd(); });
        this.dragging = false;

        syncBeforeAfterSize(this.container);
    };

    BeforeAfter.prototype.onDragStart = function (e) {
        this.dragging = true;
        this.update(e.clientX);
    };

    BeforeAfter.prototype.onDrag = function (e) {
        if (this.dragging) {
            this.update(e.clientX);
        }
    };

    BeforeAfter.prototype.onDragEnd = function () {
        this.dragging = false;
    };

    BeforeAfter.prototype.update = function (x) {
        const rect = this.container.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;
        position = Math.max(0, Math.min(100, position));

        this.handle.style.left = position + '%';
        this.before.style.width = position + '%';

        syncBeforeAfterSize(this.container);
    };

    new BeforeAfter({ id: '#highlevel1' });
    new BeforeAfter({ id: '#highlevel2' });
    new BeforeAfter({ id: '#highlevel3' });
    new BeforeAfter({ id: '#highlevel4' });

    new BeforeAfter({ id: '#obj-img-comp1' });
    new BeforeAfter({ id: '#obj-img-comp2' });
    new BeforeAfter({ id: '#obj-img-comp3' });
    new BeforeAfter({ id: '#obj-img-comp4' });

    new BeforeAfter({ id: '#viscomp1' });
    new BeforeAfter({ id: '#viscomp2' });
    new BeforeAfter({ id: '#viscomp3' });
    new BeforeAfter({ id: '#viscomp4' });

    window.addEventListener('resize', function () {
        const containers = document.querySelectorAll('.bal-container-small');
        containers.forEach(function (container) {
            syncBeforeAfterSize(container);
        });
    });
});
