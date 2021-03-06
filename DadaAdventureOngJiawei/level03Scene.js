//level03Scene.js

class level03Scene extends Phaser.Scene {

   constructor ()
   {
       super({ key: 'level03Scene' });
   }


   preload(){
      //map made with Tiled in JSON format
      this.load.tilemapTiledJSON('map3', 'assets/level03.json');

      // tiles in spritesheet
      this.load.spritesheet('tiles', 'assets/tiled-32x32.png', {frameWidth: 32, frameHeight: 32});

      // simple sapling animations
      this.load.atlas('sapling', 'assets/sapling.png', 'assets/sapling.json');
      
      // player animations
      this.load.atlas('player', 'assets/player1.png', 'assets/player1.json');

      // player animations
      this.load.atlas('cow', 'assets/cow.png', 'assets/cow.json');


   }

   create() {
      var map = this.make.tilemap({key: 'map3'});
        var Tiles = map.addTilesetImage('tiled-32x32', 'tiles');

        // groundLayer & platformLayer from Tiled
        this.groundLayer = map.createDynamicLayer('groundLayer', Tiles, 0, 0); 
        this.platformLayer = map.createDynamicLayer('platformLayer', Tiles, 0, 0);  
        this.treeLayer = map.createDynamicLayer('treeLayer', Tiles, 0, 0); 
        this.platformLayer.setCollisionByProperty({block:true});
        this.treeLayer.setCollisionByProperty({block:true});
        

        // Set starting and ending position using name
         this.start = map.findObject("objectLayer", obj => obj.name === "start");
         this.end = map.findObject("objectLayer", obj => obj.name === "end");

        // robot position
         this.cow1 = map.findObject("objectLayer", obj => obj.name === "cow1");
        


        // create the ground layer
        // this.groundLayer.setCollisionByExclusion([-1]);
        //this.groundLayer.setCollisionByProperty({block: true});

        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // create the player sprite
        this.player = this.physics.add.sprite(1263, 355, 'player').setScale(0.2);
        

       // small fix to our player images, we resize the physics body object slightly
       this.player.body.setSize(this.player.width, this.player.height);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.add.collider(this.player, this.treeLayer);
   
    
        // player walk animation
        this.anims.create({
        key:'walk',
        frames:[
        {key: 'player', frame: 'walk-01'},
        {key: 'player', frame: 'walk-02'},
        {key: 'player', frame: 'walk-03'},
        {key: 'player', frame: 'walk-04'},
        {key: 'player', frame: 'walk-05'},
        ],
    
        frameRate:10,
        repeat: -1
        });

        this.anims.create({
        key:'walk',
        frames: [{key:'player', frame:'walk-01'}],
        frameRate:10,
        });

        this.anims.create({
        key:'back',
        frames:[
        {key: 'player', frame: 'back-01'},
        {key: 'player', frame: 'back-02'},
        {key: 'player', frame: 'back-03'},
        {key: 'player', frame: 'back-04'},
        {key: 'player', frame: 'back-05'},
        ],
    
        frameRate:10,
        repeat: -1
        });

        this.anims.create({
         key:'back',
        frames: [{key:'player', frame:'back-01'}],
        frameRate:10,
        });

        this.anims.create({
        key:'front',
        frames:[
        {key: 'player', frame: 'front-01'},
        {key: 'player', frame: 'front-02'},
        {key: 'player', frame: 'front-03'},
        {key: 'player', frame: 'front-04'},
        {key: 'player', frame: 'front-05'},
        ],
    
        frameRate:10,
        repeat: -1
        });
        // idle with only one frame, so repeat is not needed
    

        this.anims.create({
        key:'front',
        frames: [{key:'player', frame:'front-01'}],
        frameRate:10,
        });
        

        this.time.addEvent({ delay: 1000, callback: this.moveDownUp1, callbackScope: this, loop: false });
        
        ////// cow animation
        this.anims.create({
         key:'cow-back',
         frames:[
         {key: 'cow', frame: 'cow-back01'},
         {key: 'cow', frame: 'cow-back02'},
         {key: 'cow', frame: 'cow-back03'},
         {key: 'cow', frame: 'cow-back04'},
         {key: 'cow', frame: 'cow-back05'},
         ],
     
         frameRate:10,
         repeat: -1
         });
         
         
         this.anims.create({
         key:'cow-front',
         frames:[
         {key: 'cow', frame: 'cow-front01'},
         {key: 'cow', frame: 'cow-front02'},
         {key: 'cow', frame: 'cow-front03'},
         {key: 'cow', frame: 'cow-front04'},
         {key: 'cow', frame: 'cow-front05'},
         ],
     
         frameRate:10,
         repeat: -1
         });
         
         this.anims.create({
            key:'cow-walk',
            frames:[
            {key: 'cow', frame: 'cow-walk01'},
            {key: 'cow', frame: 'cow-walk02'},
            {key: 'cow', frame: 'cow-walk03'},
            {key: 'cow', frame: 'cow-walk04'},
            {key: 'cow', frame: 'cow-walk05'},
            ],
        
            frameRate:10,
            repeat: -1
            });

         
         this.cow1 = this.physics.add.sprite(940, 55, 'cow').setScale(0.2).play('cow-front');

        ////// sapling animation
        this.anims.create({
         key:'sapling',
         frames:[
         {key: 'sapling', frame: 'sapling'},
         {key: 'sapling', frame: 'sapling-02'},
         {key: 'sapling', frame: 'sapling-03'},
         {key: 'sapling', frame: 'sapling-04'},
         {key: 'sapling', frame: 'sapling-05'},
         ],
     
         frameRate:10,
         repeat: -1
         });

         this.sapling = this.physics.add.sprite(1030, 80, 'sapling').setScale(0.1).play('sapling');
         this.sapling = this.physics.add.sprite(920, 550, 'sapling').setScale(0.1).play('sapling');
         this.sapling = this.physics.add.sprite(285, 555, 'sapling').setScale(0.1).play('sapling');
         this.sapling = this.physics.add.sprite(360, 270, 'sapling').setScale(0.1).play('sapling');
         this.sapling = this.physics.add.sprite(60, 160, 'sapling').setScale(0.1).play('sapling');


        // Create the cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBackgroundColor('#ccccff'); 

   }

   update(){
      if (this.cursors.left.isDown)
     {
        console.log("left");
        this.player.body.setVelocityX(-200);
        this.player.anims.play('walk', true); // walk left
        this.player.flipX = true; // flip the sprite to the left
     }
     else if (this.cursors.right.isDown)
     {
        console.log("right");
        this.player.body.setVelocityX(200);
        this.player.anims.play('walk', true);
        this.player.flipX = false; // use the original sprite looking to the right
     } 
     else if (this.cursors.up.isDown)
     {
        console.log("up");
        this.player.body.setVelocityY(-200);
        this.player.anims.play('back', true);
     }
     else if (this.cursors.down.isDown)
     {
        console.log("down");
        this.player.body.setVelocityY(200);
        this.player.anims.play('front', true);
     }

     else {
        this.player.body.setVelocity(0);
        this.player.anims.stop();
     } 

       // Check for reaching endPoint object
       if ( this.player.x <= 45 && this.player.y >= 75 ) {
         console.log('Reached End, mainScene');
         //this.cameras.main.shake(500);
         this.time.delayedCall(1000,function() {
          this.scene.start("mainScene");
         },[], this);
         }
        
    }

    moveDownUp1() {
      console.log('moveDownUp')
      this.tweens.timeline({
          targets: this.thief,
          ease: 'Linear',
          loop: -1, // loop forever
          duration: 3000,
          tweens: [
          {
              y: 230,
          },
          {
              y: 55,
          },
      ]
      });
  }

    collectCoin(sprite, tile){
      console.log("Coin collected");
      this.coinLayer.removeTileAt(tile.x, tile.y); // remove the coin when overlap
         
      return false;
      }


}