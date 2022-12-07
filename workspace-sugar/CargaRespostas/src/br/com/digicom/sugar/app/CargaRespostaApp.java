package br.com.digicom.sugar.app;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import br.com.digicom.sugar.daobase.comum.DaoBaseComum;

public class CargaRespostaApp {

	public static void main(String[] args) {
		CargaRespostaObj obj = new CargaRespostaObj();
		try {
			carregaProp();
			obj.executa();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	private static void carregaProp() throws IOException {
		System.out.println("Dir:" + System.getProperty("user.dir"));
		InputStream input = new FileInputStream("Sugar.config");
		Properties prop = new Properties();
        prop.load(input);
        String UrlLoopback = prop.getProperty("loopback.url");
        DaoBaseComum.setUrl(UrlLoopback);
	}

}
