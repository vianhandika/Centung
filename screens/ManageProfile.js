import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from "@rneui/themed";

const ManageProfile = () => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [riwayatSakit, setRiwayatSakit] = useState('');

  const handleSimpan = () => {
    // Lakukan aksi simpan data di sini
  };

  return (
    <View style={styles.container}>
      <Input
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap"
        value={namaLengkap}
        onChangeText={(text) => setNamaLengkap(text)}
      />
      <Input
        label="Jenis Kelamin"
        placeholder="Masukkan jenis kelamin"
        value={jenisKelamin}
        onChangeText={(text) => setJenisKelamin(text)}
      />
      <Input
        label="Tanggal Lahir"
        placeholder="Masukkan tanggal lahir"
        value={tanggalLahir}
        onChangeText={(text) => setTanggalLahir(text)}
      />
      <Input
        label="Tinggi Badan"
        placeholder="Masukkan tinggi badan"
        value={tinggiBadan}
        onChangeText={(text) => setTinggiBadan(text)}
      />
      <Input
        label="Berat Badan"
        placeholder="Masukkan berat badan"
        value={beratBadan}
        onChangeText={(text) => setBeratBadan(text)}
      />
      <Input
        label="Riwayat Sakit"
        placeholder="Masukkan riwayat sakit"
        value={riwayatSakit}
        onChangeText={(text) => setRiwayatSakit(text)}
        multiline
      />
      <Button title="Simpan" onPress={handleSimpan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ManageProfile;