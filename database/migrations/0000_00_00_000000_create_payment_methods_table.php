<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentMethodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            // $table->string('icon'); //images to be managed by spatie media library
            // $table->enum('type',['RAZORPAY','COD','WALLET'])->default('COD');
            $table->double('min_order_amount', 10, 2)->default(0);
            $table->string('payment_key')->nullable();
            $table->string('payment_secret')->nullable();
            $table->boolean('active')->default(true)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('payment_types');
    }
}
