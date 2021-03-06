		var stage;
        var rate;
        var isAutomate;
        var offset;
        var container;
        var body;
        var rightArm;
        var leftArm;
        var loader;

        function init() {

			// create a stage object to work with the canvas. This is the top level node in the display list:
			stage = new createjs.Stage(canvas);
            
			rate = 0;
            offset = 100;

            body = new Segment(120, 30, '#FFFF99');
            body.rotation = 90;
            body.y = -120;

            rightArm = new Segment(85, 25, '#FFFF99');
            rightArm.x = body.getPoint().x;
            rightArm.y = body.y;
            rightArm.rotation = 90;

            rightForeArm = new Segment(80, 20, '#FFFF99');
            rightForeArm.x = rightArm.getPoint().x;
            rightForeArm.y = rightArm.getPoint().y;
            rightForeArm.rotation = 90;

            leftArm = new Segment(85, 25, '#FFFF99');
            leftArm.x = body.getPoint().x;
            leftArm.y = body.y;
            leftArm.rotation = 90;

            leftForeArm = new Segment(80, 20, '#FFFF99');
            leftForeArm.x = rightArm.getPoint().x;
            leftForeArm.y = rightArm.getPoint().y;
            leftForeArm.rotation = 90;

            rightThigh = new Segment(95, 20, '#FFFF99');
            rightThigh.x = body.getPoint().x;
            rightThigh.y = body.getPoint().y;
            rightThigh.rotation = 90;

            right = new Segment(110, 30, '#FFFF99');
            right.x = rightThigh.getPoint().x;
            right.y = rightThigh.getPoint().y;
            right.rotation = 90;

            leftThigh = new Segment(95, 20, '#FFFF99');
            leftThigh.x = body.getPoint().x;
            leftThigh.y = body.getPoint().y;
            leftThigh.rotation = 90;

            rightFoot = new Segment(45, 40, '#FFFF99');
            rightFoot.x = right.getPoint().x;
            rightFoot.y = right.getPoint().y;

            left = new Segment(110, 30, '#FFFF99');
            left.x = leftThigh.getPoint().x;
            left.y = leftThigh.getPoint().y;
            left.rotation = 90;

            leftFoot = new Segment(45, 40, '#FFFF99');
            leftFoot.x = left.getPoint().x;
            leftFoot.y = left.getPoint().y;

            container = new createjs.Container();
            container.addChild(leftArm,leftForeArm,leftThigh,leftFoot,left,body,right,rightThigh,rightFoot,rightForeArm,rightArm);
            container.x = 275;
            container.y = 137;

            isAutomate = false;

            stage.addChild(container);
            stage.update();

			createjs.Ticker.addListener(window);
        }

        function stop() {
			createjs.Ticker.removeListener(window);
        }

        function move(segA, segB, segC, p_rate) {
           var angleA = Math.sin(p_rate) * 45 + 90;
           var angleB = Math.sin(p_rate + offset) * 45 + 45;
           var angleC = Math.sin(p_rate) * 90 - 50;

           segA.rotation = angleA;
           segB.rotation = segA.rotation + angleB;
           segC.rotation = segB.rotation + angleC;

           segB.x = segA.getPoint().x;
           segB.y = segA.getPoint().y;

           segC.x = segB.getPoint().x;
           segC.y = segB.getPoint().y;
        }

        function moveUpperBody(segA, segB, p_rate) {
            var angleA = Math.sin(p_rate) * 45 + 90;
            var angleB = Math.sin(p_rate + offset) * 45 - 35;

            segA.rotation = angleA;
            segB.rotation = segA.rotation + angleB;

            segB.x = segA.getPoint().x;
            segB.y = segA.getPoint().y;
        }

        function handleClick(event) {
            isAutomate = !isAutomate;
        }

        function tick() {
            rate += 0.1;

           move(rightThigh, right, rightFoot, rate);
           move(leftThigh, left, leftFoot, rate*2);

           moveUpperBody(leftArm, leftForeArm, rate*2.5);
           moveUpperBody(rightArm, rightForeArm, rate*1.5);

           stage.update();
        }
